import { NextFunction, Request, Response, Router } from 'express'
import { jwtPAuth } from '../../../middlewares'
import { BaseController } from '../controller'
import { checkRole } from '../middlewares'

interface options<Model extends {}> {
  router: Router
  controller: BaseController<Model>
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

const queryExtract = (req: Request): object => ({
  order: req.query.order,
  limit: req.query.limit,
  offset: req.query.offset
})

export const endpointsCrud = <Model extends {}>(params: options<Model>) => {
  const { router, controller, excludeEndpoints, rolesForEndpoints: roles } = params

  const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body: idBy } = req
      const query = queryExtract(req)
      res.json(await controller.read({ idBy, query }))
    } catch (error) {
      next(error)
    }
  }

  const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: idBy } = req.params
      const query = queryExtract(req)
      res.json(await controller.read({ idBy, query }))
    } catch (error) {
      next(error)
    }
  }

  const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body: data } = req
      const newData = await controller.create({ data })
      res.status(201).json(newData)
    } catch (err) {
      next(err)
    }
  }

  const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body: data, params } = req
      const updateRes = await controller.update({ idBy: params.id, data })
      res.status(200).json(updateRes)
    } catch (err) {
      next(err)
    }
  }

  const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: idBy } = req.params
      const deleteRes = await controller.delete({ idBy })
      res.status(200).json(deleteRes)
    } catch (err) {
      next(err)
    }
  }

  if (!excludeEndpoints?.read) {
    router.get('/', jwtPAuth(), checkRole(roles?.read), getAll)
    router.get('/:id', jwtPAuth(), checkRole(roles?.read), getOne)
  }

  if (!excludeEndpoints?.create) {
    router.post('/', jwtPAuth(), checkRole(roles?.create), create)
  }

  if (!excludeEndpoints?.update) {
    router.patch('/:id', jwtPAuth(), checkRole(roles?.update), update)
  }

  if (!excludeEndpoints?.delete) {
    router.delete('/:id', jwtPAuth(), checkRole(roles?.update), remove)
  }

  return router
}
