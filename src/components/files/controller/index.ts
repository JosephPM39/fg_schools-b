import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import { v4 as uuidV4 } from 'uuid'
import fs from 'fs'
import config from '../../../config/'
import mime from 'mime-types'
import { FileName, IQuery } from '../../../core_db/validations/query'
import { validateQuery } from '../../../core_db'
import Jimp from 'jimp'

interface CreateThumb {
  imgPath: string
  width: number | 'AUTO'
  height: number | 'AUTO'
  thumbPath: string
}

const isMime = (filemime: string, mimeBase: string) => {
  const mimeMatch = !!filemime.match(mimeBase)
  const mimeExists = !!mime.extension(filemime)
  return mimeMatch && mimeExists
}

const isImgMimeAllowed = (filemime: string) => {
  const mimeAllowed = [
    mime.types.bmp,
    mime.types.gif,
    mime.types.jpeg,
    mime.types.png,
    mime.types.tiff
  ]
  if (!isMime(filemime, 'image/')) return false
  return mimeAllowed.includes(filemime)
}

const imgFilter = (_: Request, file: Express.Multer.File, next: FileFilterCallback) => {
  if (!isImgMimeAllowed(file.mimetype)) {
    return next(boom.badRequest('Only image file type are allowed'))
  }
  return next(null, true)
}

const pathStat = async (path: string) => {
  return await new Promise<fs.Stats>(
    (resolve, reject) => fs.stat(path, (err, stat) => {
      if (err) return reject(err)
      return resolve(stat)
    })
  )
}

export class StorageFile {
  protected dir = path.join(config.appStorageDir, '/files', this.subDir)

  storage = multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, this.dir)
    },
    filename: (req, file, cb) => {
      const { filename } = req.query as unknown as IQuery
      console.log(filename, 'type filename')
      if (filename === FileName.keepClientVersion) {
        return cb(null, file.originalname)
      }
      if (filename === FileName.autoUuid || !filename) {
        const ext = mime.extension(file.mimetype) || ''
        return cb(null, `${uuidV4()}.${ext}`)
      }
    }
  })

  constructor (
    protected subDir: string,
    protected readonly options: Omit<multer.Options, 'storage' | 'dest'> = {}
  ) {
    this.loadDir()
  }

  protected readonly loadDir = (dir: string = this.dir) => {
    fs.mkdir(dir, { recursive: true }, () => {})
  }

  readonly appendDir = (dir: string) => {
    this.dir = path.join(this.dir, dir)
    this.loadDir()
  }

  readonly setSubDir = (dir: string) => {
    this.subDir = dir
    this.dir = path.join(config.appStorageDir, '/files', this.subDir)
    this.loadDir()
  }

  protected readonly upload = multer({
    storage: this.storage,
    ...this.options
  })

  uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
    await validateQuery(req.query)
    const uploader = this.upload.single('file')
    uploader(req, res, (err) => {
      if (err) return next(err)
      if (!req.file) return next(boom.badRequest('Please upload a file'))
      return res.status(201)
    })
  }

  protected readonly listDir = async <T>(
    ...args: Parameters<typeof Array.prototype.map<T>>
  ) => await new Promise<T[]>((resolve, reject) => {
    const isFile = async (name: string) => {
      return (await pathStat(path.join(this.dir, name))).isFile()
    }

    const filterOnlyFiles = async (filesAndDirs: string[]) => {
      const files: string[] = []
      await Promise.all(filesAndDirs.map(async (v) => {
        if (await isFile(v)) {
          files.push(v)
        }
      }))
      return files
    }

    const applyFormat = async (filesAndDirs: string[]) => {
      const files = await filterOnlyFiles(filesAndDirs)
      return files.map(...args)
    }

    fs.readdir(this.dir, (err, filesAndDirs) => {
      if (err) return reject(boom.internal('Directory issues'))
      if (!filesAndDirs || filesAndDirs.length < 1) return resolve([])
      applyFormat(filesAndDirs).then(resolve).catch(reject)
    })
  })

  protected getListFilesFormat = (req: Request) => {
    return (file: string) => ({
      name: file,
      url: `${req.protocol}://${req.headers.host ?? ''}${req.baseUrl}/download${req.path}${file}`
    })
  }

  getListFiles = (req: Request, res: Response, next: NextFunction) => {
    const format = this.getListFilesFormat(req)
    this.listDir(format)
      .then((data) => res.status(200).json(data))
      .catch((er) => next(er))
  }

  download = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params
    res.status(200).download(path.join(this.dir, name), name, (err) => {
      if (err) return next(boom.internal('Cloud not download the file'))
    })
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params
    await validateQuery(req.query)
    req.query.filename = FileName.keepClientVersion
    if (req.file) {
      req.file.originalname = name
    }

    const uploader = this.upload.single('file')
    uploader(req, res, (err) => {
      if (err) return next(err)
      if (!req.file) return next(boom.badRequest('Please upload a file'))
      return res.status(201).json({
        message: 'Uploaded successfully'
      })
    })
  }

  delete = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params
    fs.rm(path.join(this.dir, name), (err) => {
      if (err) return next(boom.internal('Cloud not delete the file'))
    })
    res.status(200).send('File deleted')
  }
}

export class StorageImg extends StorageFile {
  private readonly thumbDir = path.join(this.dir, '/thumbnails')
  constructor (
    ...args: ConstructorParameters<typeof StorageFile>
  ) {
    if (!args[1]) {
      args[1] = {
        fileFilter: imgFilter
      }
    }
    super(...args)
    this.loadDir(this.thumbDir)
  }

  protected getListFilesFormat = (req: Request) => {
    return (file: string) => ({
      name: file,
      urlPreview: `${req.protocol}://${req.headers.host ?? ''}${req.baseUrl}${req.path}${file}`,
      url: `${req.protocol}://${req.headers.host ?? ''}${req.baseUrl}/download${req.path}${file}`
    })
  }

  protected createThumb = async (args: CreateThumb) => {
    const { imgPath, width: w, height: h, thumbPath } = args
    const img = await Jimp.read(imgPath)
    const width = w === 'AUTO' ? Jimp.AUTO : w
    const height = h === 'AUTO' ? Jimp.AUTO : h

    return await new Promise<boolean>(
      (resolve, reject) => {
        img.resize(width, height, (err) => {
          if (err) return reject(err)
        }).write(thumbPath, (err) => {
          if (err) return reject(err)
          return resolve(true)
        })
      }
    )
  }

  updateImg = async (...args: Parameters<typeof this.update>) => {

  }

  downloadPreview = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params
    const query = await validateQuery(req.query)
    const determineWH = (): {
      height: number | 'AUTO'
      width: number | 'AUTO'
    } => {
      const { w, h } = {
        h: query?.imgheight,
        w: query?.imgwidth
      }
      if (w && h) return { height: h, width: w }
      if (w && !h) return { height: 'AUTO', width: w }
      if (!w && h) return { height: h, width: 'AUTO' }
      return { height: 100, width: 'AUTO' }
    }

    const { width, height } = determineWH()

    const imgPath = path.join(this.dir, name)
    const thumbName = `thumb-${width}x${height}-${name}`
    const thumbPath = path.join(this.thumbDir, thumbName)

    const mimetype = mime.lookup(imgPath)
    if (!mimetype || !isImgMimeAllowed(mimetype)) {
      return next(boom.badRequest('Image type not allowed'))
    }

    const download = (src: string, name: string) => {
      return res.status(200).download(src, name, (err) => {
        if (err) return next(boom.internal('Cloud not download the thumb'))
      })
    }

    const isThumbExists = async () => {
      try {
        return (await pathStat(thumbPath)).isFile()
      } catch {
        return false
      }
    }

    if (await isThumbExists()) {
      return download(thumbPath, thumbName)
    }

    const isThumbCreated = await this.createThumb({
      imgPath,
      thumbPath,
      width,
      height
    })

    if (!isThumbCreated) {
      return next(boom.internal('Cloud not create the thumb'))
    }

    return download(thumbPath, thumbName)
  }
}
