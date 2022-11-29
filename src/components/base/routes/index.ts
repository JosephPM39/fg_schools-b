import { NextFunction, Request, Response, Router } from 'express'
import { BaseController } from '../controller'

interface options {
  router: Router
  controller: BaseController<{}, {}, {}, {}, {}>
  excludeEndpoints?: {
    read?: boolean
    create?: boolean
    update?: boolean
    delete?: boolean
  }
}

export const endpointsCrud = (params: options) => {
  const { router, controller, excludeEndpoints } = params

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

  if (!excludeEndpoints?.read) {
    router.get('/', getAll)
    router.get('/:id', getOne)
  }

  return router
}
