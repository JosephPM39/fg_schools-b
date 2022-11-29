import Boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'

export const checkRole = (roles?: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const role = req?.user?.role
  if (!roles) return next() // change this to 'if (!roles) return next(Boom.unauthorized())' when you wish validate roles
  if (roles.includes(role)) return next()
  return next(Boom.unauthorized())
}
