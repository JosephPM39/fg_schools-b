import { faker } from '@faker-js/faker'
import { IOrder, IGallery, ISectionProm } from '../../../models_school'
import type { WithRequired } from '../types'
import { BaseFaker, Fake, WithId } from '../model.faker'

export type IGalleryD = {
  order: WithRequired<IOrder, 'id'>
  sectionProm: WithRequired<ISectionProm, 'id'>
}

export class GalleryFaker extends BaseFaker<IGallery, IGalleryD> {
  makeOneFake = <C extends WithId = undefined>(params: IGalleryD, withId?: C): Fake<IGallery, C> => {
    const { order, sectionProm } = params
    const base: Partial<IGallery> = {
      orderId: order.id,
      sectionPromId: sectionProm.id,
      available: faker.datatype.boolean()
    }

    return this.makeOneHelper(base, withId)
  }
}
