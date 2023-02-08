import { Router } from 'express'
import { StorageImg } from '../controller'
import { filesRoles as roles } from '../auth'
import { auth } from '../middleware'

export const SchoolIcons = () => {
  const router = Router()
  const StorageIcon = new StorageImg('/schools_icons')
  router.post('/', ...auth(roles.upload), StorageIcon.uploadHandler)
  router.get('/', ...auth(roles.download), StorageIcon.listHandler)
  router.get('/:name', ...auth(roles.preview), StorageIcon.downloadPreviewHandler)
  router.get('/download/:name', ...auth(roles.download), StorageIcon.downloadHandler)
  router.put('/:name', ...auth(roles.update), StorageIcon.uploadHandler)
  router.delete('/:name', ...auth(roles.delete), StorageIcon.deleteHandler)

  return router
}
