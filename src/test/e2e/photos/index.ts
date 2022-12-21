import { TestMutableParams } from '../types'
import { testPhotoProduct } from './photo-product.e2e-d'
import { testPhoto } from './photo.e2e-d'
import { testQr } from './qr.e2e-d'

export const testPhotoComponent = (params: TestMutableParams) => {
  describe('[COMPONENT]: Photos', () => {
    testPhoto(params)
    testQr(params)
    testPhotoProduct(params)
  })
}
