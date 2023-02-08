import { NextFunction, Request, Response } from 'express'

export type Handler = (req: Request, res: Response, next: NextFunction) => void

export interface StorageFileFunctions {
  upload: (req: Request, res: Response) => Promise<true>
  update: (req: Request, res: Response) => Promise<true>
  delete: (req: Request) => Promise<true>
  listHandler: Handler
  uploadHandler: Handler
  downloadHandler: Handler
  updateHandler: Handler
  deleteHandler: Handler
}

export interface StorageImgFunctions extends StorageFileFunctions {
  downloadPreview: (req: Request) => Promise<{
    name: string
    path: string
  }>
  downloadPreviewHandler: Handler
}
