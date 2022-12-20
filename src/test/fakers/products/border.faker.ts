import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { IBorder } from '../.././../models_school/'

export class BorderFaker extends BaseFaker<IBorder, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<IBorder, C> => {
    const base: Partial<IBorder> = {
      name: faker.datatype.string(30),
      file: faker.datatype.string(100),
      available: faker.datatype.boolean()
    }

    return this.makeOneHelper(base, withId)
  }
}
