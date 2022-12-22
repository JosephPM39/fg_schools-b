import { faker } from '@faker-js/faker'
import { IPhoto, IPhotoProduct, IProduct } from '../../../models_school'
import type { WithRequired } from '../types'
import { BaseFaker, Fake, WithId } from '../model.faker'

export interface IPhotoProductD {
  photo: WithRequired<IPhoto, 'id'>
  product: WithRequired<IProduct, 'id'>
}

export class PhotoProductFaker extends BaseFaker<IPhotoProduct, IPhotoProductD> {
  makeOneFake = <C extends WithId = undefined>(params: IPhotoProductD, withId?: C): Fake<IPhotoProduct, C> => {
    const { photo, product } = params
    const base: Partial<IPhotoProduct> = {
      photoId: photo.id,
      productId: product.id,
      code: faker.helpers.unique(faker.datatype.string, [20])
    }

    return this.makeOneHelper(base, withId)
  }
}
