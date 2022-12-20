import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { ICombo } from '../.././../models_school/'

export class ComboFaker extends BaseFaker<ICombo, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<ICombo, C> => {
    const base: Partial<ICombo> = {
      name: faker.datatype.string(30),
      available: faker.datatype.boolean()
    }

    return this.makeOneHelper(base, withId)
  }
}
