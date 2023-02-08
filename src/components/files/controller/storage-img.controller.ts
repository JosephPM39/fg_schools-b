import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import { FileFilterCallback } from 'multer'
import path from 'path'
import fs from 'fs'
import mime from 'mime-types'
import { validateQuery } from '../../../core_db'
import Jimp from 'jimp'
import { StorageFile } from './storage-file.controller'
import { StorageImgFunctions } from './types'
import { determineWH, isMime, pathIsFile } from './utils'

interface CreateThumb {
  imgPath: string
  width: number | 'AUTO'
  height: number | 'AUTO'
  thumbPath: string
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

export class StorageImg extends StorageFile implements StorageImgFunctions {
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

  protected listDirFormat = (req: Request) => {
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

  downloadPreview = async (req: Request) => {
    const query = await validateQuery(req.query)
    const { name } = req.params

    const imgPath = path.join(this.dir, name)
    const mimetype = mime.lookup(imgPath)

    if (!mimetype || !isImgMimeAllowed(mimetype)) {
      throw (boom.badRequest('Image type not allowed'))
    }

    const { width, height } = determineWH(query)
    const thumbName = `thumb-${width}x${height}-${name}`
    const thumbPath = path.join(this.thumbDir, thumbName)
    const response = { path: thumbPath, name: thumbName }

    if (await pathIsFile(thumbPath)) {
      return response
    }

    const isThumbCreated = await this.createThumb({
      imgPath,
      thumbPath,
      width,
      height
    })

    if (!isThumbCreated) {
      throw (boom.internal('Cloud not create the thumb'))
    }

    return response
  }

  downloadPreviewHandler = async (req: Request, res: Response, next: NextFunction) => {
    this.downloadPreview(req).then(
      ({ path, name }) => res.status(200).download(path, name, (err) => next(err))
    ).catch((err) => next(err))
  }

  deletePreview = async (req: Request) => {
    const { name } = req.params
    const toDelete = fs.readdirSync(this.thumbDir).filter((file) => file.match(name))
    let error: Error | undefined
    for (const file of toDelete) {
      try {
        fs.rmSync(path.join(this.thumbDir, file))
      } catch (err) {
        error = err as Error
        break
      }
    }
    if (error) throw error
    return true
  }

  deletePreviewHandler = async (req: Request, res: Response, next: NextFunction) => {
    this.deletePreview(req).then(
      () => res.status(200).send('File updated/deleted successfully')
    ).catch(
      (err) => next(err)
    )
  }

  updateHandler = (req: Request, res: Response, next: NextFunction) => {
    this.update(req, res).then(
      async () => await this.deletePreviewHandler(req, res, next)
    ).catch((err) => next(err))
  }

  deleteHandler = (req: Request, res: Response, next: NextFunction) => {
    this.delete(req).then(
      async () => await this.deletePreviewHandler(req, res, next)
    ).catch((err) => next(err))
  }
}
