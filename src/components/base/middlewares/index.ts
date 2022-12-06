import Boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'

export const checkRole = (roles?: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const role = req?.user?.role
  if (!role) return next(Boom.unauthorized('Undefined role'))
  if (!roles || !role) return next(Boom.internal('Undefined roles'))
  // change this to 'if (!roles) return next(Boom.internal('Undefined roles'))' when you wish validate roles
  if (roles.includes(role)) return next()
  return next(Boom.unauthorized())
}
