import { endpointsCrud } from '../../../core_api'
import { Router } from 'express'
import { entitiesRoles } from '../auth'
import { BaseController, Connection as DB } from '../../../core_db'
import { Border, Color, Model, Product, Profile, Size, Type } from '../../../models_school'

export const ProductsRoutes = (connection: DB) => {
  const router = Router()

  const ProductRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Product),
    rolesForEndpoints: entitiesRoles.product
  })

  const ModelRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Model),
    rolesForEndpoints: entitiesRoles.model
  })

  const SizeRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Size),
    rolesForEndpoints: entitiesRoles.size
  })

  const ColorRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Color),
    rolesForEndpoints: entitiesRoles.color
  })

  const BorderRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Border),
    rolesForEndpoints: entitiesRoles.border
  })

  const ProfileRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Profile),
    rolesForEndpoints: entitiesRoles.profile
  })

  const TypeRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Type),
    rolesForEndpoints: entitiesRoles.type
  })

  router.use('/product', ProductRoutes)
  router.use('/size', SizeRoutes)
  router.use('/type', TypeRoutes)
  router.use('/profile', ProfileRoutes)
  router.use('/border', BorderRoutes)
  router.use('/model', ModelRoutes)
  router.use('/color', ColorRoutes)

  return router
}
