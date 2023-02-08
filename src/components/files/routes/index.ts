import { Router } from 'express'
import { AlbumPhotos } from './album-photos.routes'
import { SchoolIcons } from './school-icons.routes'

export const FilesRoutes = () => {
  const router = Router()
  router.use('/school-icon', SchoolIcons())
  router.use('/albums', AlbumPhotos())
  return router
}
