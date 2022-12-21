import { faker } from '@faker-js/faker'
import { IOrder, IPhoto, IProm } from '../../../models_school'
import type { WithRequired } from '../types'
import { BaseFaker, Fake, ManyFakesParams, WithId, FakesArray, arrayContainsId } from '../model.faker'

export interface IPhotoD {
  oneOrder: WithRequired<IOrder, 'id'>
  oneProm: WithRequired<IProm, 'id'>
  manyProms: Array<WithRequired<IProm, 'id'>>
  manyOrders: Array<WithRequired<IOrder, 'id'>>
}

export class PhotoFaker extends BaseFaker<IPhoto, IPhotoD> {
  makeOneFake = <C extends WithId = undefined>(params: IPhotoD, withId?: C): Fake<IPhoto, C> => {
    const { oneOrder, oneProm } = params
    const base: Partial<IPhoto> = {
      order: oneOrder.id,
      prom: oneProm.id,
      startCode: faker.datatype.string(20),
      endCode: faker.datatype.string(20),
      studentPhotos: faker.datatype.string(100),
      sectionPhotos: faker.datatype.string(100),
      available: faker.datatype.boolean()
    }

    return this.makeOneHelper(base, withId)
  }

  makeManyFake = <C extends WithId = undefined>(params: ManyFakesParams & IPhotoD, withId?: C | undefined) => {
    const { quantity = this.defaultQuantity, ...r } = params
    const remaining = r as IPhotoD

    const fakes: FakesArray<IPhoto, C> = []

    for (let i = 0; i < quantity; i++) {
      fakes.push(this.makeOneFake({
        oneOrder: remaining.manyOrders[i],
        oneProm: remaining.manyProms[i],
        manyOrders: remaining.manyOrders,
        manyProms: remaining.manyProms
      }, withId))
    }

    if (arrayContainsId(fakes)) {
      this.fakes.manyWithId = fakes
    }

    if (!arrayContainsId(fakes)) {
      this.fakes.manyWithoutId = fakes
    }
  }
}
