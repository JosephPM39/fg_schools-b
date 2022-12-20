import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { IColor } from '../.././../models_school/'

export class ColorFaker extends BaseFaker<IColor, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<IColor, C> => {
    const base: Partial<IColor> = {
      name: faker.datatype.string(30),
      sample: faker.datatype.string(100),
      hex: faker.color.rgb(),
      available: faker.datatype.boolean()
    }

    return this.makeOneHelper(base, withId)
  }
}
