import { NextFunction, Request, Response } from 'express'
import { isBoom } from '@hapi/boom'

export const logErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('LOGs:')
  console.error(err)
  next(err)
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error Handler:')
  return res.status(500).json({
    message: err.name
  })
}

export const boomErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (isBoom(err)) {
    const { output } = err
    return res.status(output.statusCode).json(output.payload)
  }
  next(err)
}
