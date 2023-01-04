import { faker } from '@faker-js/faker'
import { IGallery, IQr } from '../../../models_school'
import type { WithRequired } from '../types'
import { BaseFaker, Fake, WithId } from '../model.faker'

export type IQrD = {
  gallery: WithRequired<IGallery, 'id'>
}

export class QrFaker extends BaseFaker<IQr, IQrD> {
  makeOneFake = <C extends WithId = undefined>(params: IQrD, withId?: C): Fake<IQr, C> => {
    const { gallery } = params
    const base: Partial<IQr> = {
      galleryId: gallery.id,
      code: faker.helpers.unique(faker.datatype.string, [20]),
      url: faker.helpers.unique(faker.datatype.string, [100]),
      available: faker.datatype.boolean()
    }

    return this.makeOneHelper(base, withId)
  }
}
