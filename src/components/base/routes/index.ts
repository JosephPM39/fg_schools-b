import { NextFunction, Request, Response, Router } from 'express'
import { BaseController } from '../controller'

/* interface options<
  Model extends {},
  Create extends {},
  Id extends {},
  Get extends {},
  Update extends {}
> {
  router: Router
  controller: BaseController<Model, Create, Id, Get, Update>
 */

interface options<
  Model extends {},
  Create extends {},
  Id extends {},
  Get extends {},
  Update extends {}
> {
  router: Router
  controller: BaseController<Model, Create, Id, Get, Update>
  excludeEndpoints?: {
    read?: boolean
    create?: boolean
    update?: boolean
    delete?: boolean
  }
}

export const endpointsCrud = <
  Model extends {},
  Create extends {},
  Id extends {},
  Get extends {},
  Update extends {}
>(params: options<Model, Create, Id, Get, Update>) => {
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

/* export class CRUDEndpoints<Model extends {}> {

  router: Router
  controller: BaseController<Model>

  constructor (router: Router, controller: BaseController<Model>) {
    this.router = router
    this.controller = controller
  }

async get(req: Request, res: Response, next: NextFunction) => {
  try {

  }
}
}
*/
