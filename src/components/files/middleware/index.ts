import { NextFunction, Response, Request } from 'express'
import { checkRole } from '../../../core_api/middlewares'
import { jwtPAuth } from '../../../middlewares'

export const auth = (roles: string[]) => {
  /* return [
    jwtPAuth(),
    checkRole(roles)
  ]
  */

  return [(_: Request, __: Response, next: NextFunction) => {
    next()
  }]
}
