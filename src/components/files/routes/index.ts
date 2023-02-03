import { Router } from 'express'
import { StorageFile } from '../controller'

export const FilesRoutes = () => {
  const router = Router()
  const StorageIcon = new StorageFile('/icons')

  router.post('/icon', StorageIcon.uploadSingle)
  router.get('/icon', StorageIcon.getListFiles)
  router.get('/icon/:name', StorageIcon.download)

  return router
}
