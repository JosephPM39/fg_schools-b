import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import { v4 as uuidV4 } from 'uuid'
import fs from 'fs'
import config from '../../../config/'
import mime from 'mime-types'
import { FileName, IQuery } from '../../../core_db/validations/query'
import { validateQuery } from '../../../core_db'
import { StorageFileFunctions } from './types'
import { pathIsFile } from './utils'

export class StorageFile implements StorageFileFunctions {
  protected dir = path.join(config.appStorageDir, '/files', this.subDir)

  constructor (
    protected subDir: string,
    protected readonly options: Omit<multer.Options, 'storage' | 'dest'> = {}
  ) {
    this.loadDir()
  }

  protected readonly storage = multer.diskStorage({
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

  protected readonly multer = multer({
    storage: this.storage,
    ...this.options
  })

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

  protected readonly listDir = async <T>(
    ...args: Parameters<typeof Array.prototype.map<T>>
  ) => await new Promise<T[]>((resolve, reject) => {
    const filterOnlyFiles = async (filesAndDirs: string[]) => {
      const files: string[] = []
      await Promise.all(filesAndDirs.map(async (v) => {
        if (await pathIsFile(path.join(this.dir, v))) {
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

  protected listDirFormat = (req: Request) => {
    return (file: string) => ({
      name: file,
      url: `${req.protocol}://${req.headers.host ?? ''}${req.baseUrl}/download${req.path}${file}`
    })
  }

  upload = async (req: Request, res: Response) => {
    await validateQuery(req.query)
    return await new Promise<true>((resolve, reject) => {
      if (!req.file && !req.files) return reject(boom.badRequest('Please upload a file'))
      const uploader = req.file ? this.multer.single('file') : this.multer.array('files')
      uploader(req, res, (err) => {
        if (err) return reject(boom.conflict('Cloud not upload the file(s)'))
        resolve(true)
      })
    })
  }

  uploadHandler = (req: Request, res: Response, next: NextFunction) => {
    this.upload(req, res).then(
      () => res.status(201).send('File created successfully')
    ).catch((err) => next(err))
  }

  listHandler = (req: Request, res: Response, next: NextFunction) => {
    const format = this.listDirFormat(req)
    this.listDir(format)
      .then((data) => res.status(200).json(data))
      .catch((er) => next(er))
  }

  downloadHandler = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params
    res.status(200).download(path.join(this.dir, name), name, (err) => {
      if (err) return next(boom.internal('Cloud not download the file'))
    })
  }

  update = async (req: Request, res: Response) => {
    const { name } = req.params
    await validateQuery(req.query)
    req.query.filename = FileName.keepClientVersion
    if (req.file) {
      req.file.originalname = name
    }

    return await this.upload(req, res)
  }

  updateHandler = (req: Request, res: Response, next: NextFunction) => {
    this.update(req, res).then(
      () => res.status(201).send('File updated successfully')
    ).catch((err) => next(err))
  }

  delete = async (req: Request) => {
    const { name } = req.params
    return await new Promise<true>((resolve, reject) => {
      fs.rm(path.join(this.dir, name), (err) => {
        if (err) reject(err)
        resolve(true)
      })
    })
  }

  deleteHandler = (req: Request, res: Response, next: NextFunction) => {
    this.update(req, res).then(
      () => res.status(200).send('File deleted successfully')
    ).catch((err) => next(err))
  }
}
