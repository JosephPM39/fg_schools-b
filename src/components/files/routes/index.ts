import { NextFunction, Router, Response, Request } from 'express'
import { checkRole } from '../../../core_api/middlewares'
import { StorageImg } from '../controller'
import { filesRoles as roles } from '../auth'
import { jwtPAuth } from '../../../middlewares'
const auth = (roles: string[]) => {
  /* return [
    jwtPAuth(),
    checkRole(roles)
  ]
  */

  return [(_: Request, __: Response, next: NextFunction) => {
    next()
  }]
}

const SchoolIcons = () => {
  const router = Router()
  const StorageIcon = new StorageImg('/schools_icons')
  router.post('/', ...auth(roles.upload), StorageIcon.uploadSingle)
  router.get('/', ...auth(roles.download), StorageIcon.getListFiles)
  router.get('/:name', ...auth(roles.preview), StorageIcon.downloadPreview)
  router.get('/download/:name', ...auth(roles.download), StorageIcon.download)
  router.put('/:name', ...auth(roles.update), StorageIcon.update)
  router.delete('/:name', ...auth(roles.delete), StorageIcon.delete)

  return router
}

const Album = () => {
  const router = Router()
  const baseDir = '/photos/albums'
  const storage = new StorageImg(baseDir)
  const loadAlbum = (req: Request, _: Response, next: NextFunction) => {
    const { albumId } = req.params
    storage.setSubDir(`${baseDir}/${albumId}`)
    return next()
  }

  router.post('/:albumId', ...auth(roles.upload), loadAlbum, storage.uploadSingle)
  router.get('/:albumId', loadAlbum, storage.getListFiles)
  router.get('/:albumId/:name', loadAlbum, storage.downloadPreview)
  router.get('/download/:albumId/:name', loadAlbum, storage.download)
  router.put('/:albumId/:name', ...auth(roles.update), loadAlbum, storage.update)
  router.delete('/:albumId/:name', ...auth(roles.delete), loadAlbum, storage.delete)

  return router
}

export const FilesRoutes = () => {
  const router = Router()
  router.use('/school-icon', SchoolIcons())
  router.use('/albums', Album())
  return router
}
