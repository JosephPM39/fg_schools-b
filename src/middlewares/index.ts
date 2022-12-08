import { NextFunction, Request, Response } from 'express'
import { isBoom } from '@hapi/boom'
import passport from 'passport'

export const jwtPAuth = () => passport.authenticate('jwt', { session: false })

enum DBErrors {
  vfk = 'violates foreign key constraint'
}

enum ClientErrors {
  vfk = 'Some FK ID property doesn\'t exist'
}

const getErrorClientDB = (msg: string, res: Response) => {
  if (msg.includes(DBErrors.vfk)) {
    return res.status(400).json({
      message: ClientErrors.vfk
    })
  }
}

export const logErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('LOGs:')
  console.error(err)
  next(err)
}

export const dbErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'QueryFailedError') {
    const { message } = err
    getErrorClientDB(message, res)
  }
  next(err)
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Error Handler:')
  return res.status(err?.statusCode ?? 500).json({
    message: `${String(err.name)}: ${String(err.message)}`
  })
}

export const boomErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (isBoom(err)) {
    const { output } = err
    return res.status(output.statusCode).json(output.payload)
  }
  next(err)
}
