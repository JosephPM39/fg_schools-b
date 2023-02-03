import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import { v4 as uuidV4 } from 'uuid'
import fs from 'fs'

type DirListed = Array<{
  name: string
  url: string
}>

export class StorageFile {
  private readonly dir = path.join(__dirname, this.subDir)

  storage = multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, this.dir)
    },
    filename: (_, file, cb) => {
      cb(null, `${uuidV4()}.${file.originalname}`)
    }
  })

  constructor (
    private readonly subDir: string,
    private readonly options: Omit<multer.Options, 'storage' | 'dest'> = {}
  ) {
    fs.mkdir(this.dir, { recursive: true }, () => {

    })
  }

  upload = multer({
    storage: this.storage,
    ...this.options
  })

  uploadSingle = (req: Request, res: Response) => {
    const uploader = this.upload.single('file')
    uploader(req, res, (err) => {
      if (err) throw err
      if (!req.file) throw boom.badRequest('Please upload a file')
      return res.status(201).json({
        message: `Uploaded successfully: ${req.file.originalname}`
      })
    })
  }

  listDir = async (baseUrl: string) => await new Promise<DirListed>((resolve, reject) => {
    fs.readdir(this.dir, (err, files) => {
      if (err) return reject(boom.internal('Directory issues'))
      if (!files || files.length < 1) return resolve([])
      const data = files.map((file) => ({
        name: file,
        url: `${baseUrl}/${file}`
      }))
      return resolve(data)
    })
  })

  getListFiles = (req: Request, res: Response, next: NextFunction) => {
    this.listDir(`${req.protocol}://${req.headers.host ?? ''}${req.baseUrl}${req.path}`)
      .then((data) => res.status(200).json(data))
      .catch((er) => next(er))
  }

  download = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params
    res.download(path.join(this.dir, name), name, (err) => {
      if (err) next(boom.internal('Cloud not download the file'))
    })
  }
}
