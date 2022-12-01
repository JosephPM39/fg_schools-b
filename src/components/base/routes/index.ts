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

  const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body: data, params } = req
      const updateRes = await controller.update(params.id, data)
      res.status(200).json(updateRes)
    } catch (err) {
      next(err)
    }
  }

  const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const deleteRes = await controller.delete(id)
      res.status(200).json(deleteRes)
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

  if (!excludeEndpoints?.update) {
    router.patch('/:id', checkRole(roles?.update), update)
  }

  if (!excludeEndpoints?.delete) {
    router.delete('/:id', checkRole(roles?.update), remove)
  }

  return router
}
