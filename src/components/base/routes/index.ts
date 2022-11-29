import { NextFunction, Request, Response, Router } from 'express'
import { BaseController } from '../controller'
import { checkRole } from '../middlewares'

interface options {
  router: Router
  controller: BaseController<{}, {}, {}, {}, {}>
  excludeEndpoints?: {
    read?: boolean
    create?: boolean
    update?: boolean
    delete?: boolean
  }
  rolesForEndpoints?: {
    read?: string[]
    create?: string[]
    update?: string[]
    delete?: string[]
  }
}

export const endpointsCrud = (params: options) => {
  const { router, controller, excludeEndpoints, rolesForEndpoints: roles } = params

  const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await controller.read())
    } catch (error) {
      next(error)
    }
  }

  const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      res.json(await controller.read(id))
    } catch (error) {
      next(error)
    }
  }

  const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body: data } = req
      const newData = await controller.create(data)
      res.status(201).json(newData)
    } catch (err) {
      next(err)
    }
  }

  if (!excludeEndpoints?.read) {
    router.get('/', checkRole(roles?.read), getAll)
    router.get('/:id', checkRole(roles?.read), getOne)
  }

  if (!excludeEndpoints?.create) {
    router.post('/', checkRole(roles?.create), create)
  }

  return router
}
