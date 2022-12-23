import { faker } from '@faker-js/faker'
import { IPhoto, IQr } from '../../../models_school'
import type { WithRequired } from '../types'
import { BaseFaker, Fake, ManyFakesParams, WithId } from '../model.faker'

export type IQrD = {
  onePhoto: WithRequired<IPhoto, 'id'>
  manyPhotos: Array<WithRequired<IPhoto, 'id'>>
}

export class QrFaker extends BaseFaker<IQr, IQrD> {
  makeOneFake = <C extends WithId = undefined>(params: IQrD, withId?: C): Fake<IQr, C> => {
    const { onePhoto } = params
    const base: Partial<IQr> = {
      photoId: onePhoto.id,
      code: faker.helpers.unique(faker.datatype.string, [20]),
      url: faker.helpers.unique(faker.datatype.string, [100]),
      available: faker.datatype.boolean()
    }

    return this.makeOneHelper(base, withId)
  }

  makeManyFake = <C extends WithId = undefined>(params: ManyFakesParams & IQrD, withId?: C | undefined) => {
    const { quantity = this.defaultQuantity, ...r } = params
    const remaining = r as IQrD

    const fakes: Array<Fake<IQr, C>> = []

    for (let i = 0; i < quantity; i++) {
      fakes.push(this.makeOneFake({
        onePhoto: remaining.manyPhotos[i],
        manyPhotos: remaining.manyPhotos
      }, withId))
    }

    this.makeManyHelper(fakes)
  }
}
