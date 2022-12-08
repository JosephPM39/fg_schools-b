import { endpointsCrud } from '../../../core_api'
import { Router } from 'express'
import { entitiesRoles } from '../auth'
import { BaseController, Connection as DB } from '../../../core_db'
import { Qr, PhotoProduct, Photo } from '../../../models_school'

export const PhotosRoutes = (connection: DB) => {
  const router = Router()

  const PhotoRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Photo),
    rolesForEndpoints: entitiesRoles.photo
  })

  const PhotoProductRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, PhotoProduct),
    rolesForEndpoints: entitiesRoles.photoProduct
  })

  const QrRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Qr),
    rolesForEndpoints: entitiesRoles.qr
  })

  router.use('/qr', QrRoutes)
  router.use('/photo-product', PhotoProductRoutes)
  router.use('/photo', PhotoRoutes)

  return router
}
