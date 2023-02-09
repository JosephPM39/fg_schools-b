import { Router, Request, Response, NextFunction } from 'express'
import { StorageImg } from '../controller'
import { filesRoles as roles } from '../auth'
import { auth } from '../middleware'

export const AlbumPhotos = () => {
  const router = Router()
  const baseDir = '/photos/albums'
  const storage = new StorageImg(`${baseDir}/unknown`)

  const loadAlbum = (req: Request, _: Response, next: NextFunction) => {
    const { albumId } = req.params
    storage.setSubDir(`${baseDir}/${albumId}`)
    return next()
  }

  router.post('/upload-single/:albumId', ...auth(roles.upload), loadAlbum, storage.uploadSingleHandler)
  router.post('/upload-many/:albumId', ...auth(roles.upload), loadAlbum, storage.uploadManyHandler)
  router.get('/:albumId', loadAlbum, storage.listHandler)
  router.get('/:albumId/:name', loadAlbum, storage.downloadPreviewHandler)
  router.get('/download/:albumId/:name', loadAlbum, storage.downloadHandler)
  router.delete('/:albumId/:name', ...auth(roles.delete), loadAlbum, storage.deleteHandler)

  return router
}
