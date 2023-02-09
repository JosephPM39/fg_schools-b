import { NextFunction, Request, Response } from 'express'

export type Handler = (req: Request, res: Response, next: NextFunction) => void

export interface StorageFileFunctions {
  upload: (req: Request, res: Response) => Promise<true>
  delete: (req: Request) => Promise<true>
  listHandler: Handler
  uploadSingleHandler: Handler
  uploadManyHandler: Handler
  downloadHandler: Handler
  deleteHandler: Handler
}

export interface StorageImgFunctions extends StorageFileFunctions {
  downloadPreview: (req: Request) => Promise<{
    name: string
    path: string
  }>
  downloadPreviewHandler: Handler
}
