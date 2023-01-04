import { TestMutableParams } from '../types'
import { testAlbum } from './album.e2e-d'
import { testGalleryAlbum } from './gallery-album.e2e-d'
import { testGallery } from './gallery.e2e-d'
import { testPhotoProduct } from './photo-product.e2e-d'
import { testQr } from './qr.e2e-d'

export const testPhotoComponent = (params: TestMutableParams) => {
  describe('[COMPONENT]: Photos', () => {
    testGallery(params)
    testAlbum(params)
    testGalleryAlbum(params)
    testQr(params)
    testPhotoProduct(params)
  })
}
