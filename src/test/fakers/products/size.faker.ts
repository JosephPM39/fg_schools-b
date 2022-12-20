import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { ISize } from '../.././../models_school/'

export class SizeFaker extends BaseFaker<ISize, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<ISize, C> => {
    const base: Partial<ISize> = {
      name: faker.datatype.string(50),
      width: faker.datatype.float({ max: 9999, min: 0.5, precision: 0.001 }),
      height: faker.datatype.float({ max: 9999, min: 0.5, precision: 0.001 }),
      ppp: faker.datatype.number({ max: 1200, min: 10 }),
      available: faker.datatype.boolean()
    }

    return this.makeOneHelper(base, withId)
  }
}
