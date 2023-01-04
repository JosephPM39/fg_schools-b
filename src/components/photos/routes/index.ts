import { endpointsCrud } from '../../../core_api'
import { Router } from 'express'
import { entitiesRoles } from '../auth'
import { BaseController, Connection as DB } from '../../../core_db'
import { Qr, PhotoProduct, Gallery, GalleryAlbum, Album } from '../../../models_school'

export const PhotosRoutes = (connection: DB) => {
  const router = Router()

  const GalleryRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Gallery),
    rolesForEndpoints: entitiesRoles.gallery
  })

  const GalleryAlbumRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, GalleryAlbum),
    rolesForEndpoints: entitiesRoles.galleryAlbum
  })

  const AlbumRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Album),
    rolesForEndpoints: entitiesRoles.album
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
  router.use('/gallery', GalleryRoutes)
  router.use('/gallery-album', GalleryAlbumRoutes)
  router.use('/album', AlbumRoutes)

  return router
}
