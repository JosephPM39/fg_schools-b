import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { IType } from '../.././../models_school/'

export class TypeFaker extends BaseFaker<IType, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<IType, C> => {
    const base: Partial<IType> = {
      name: faker.datatype.string(50),
      available: faker.datatype.boolean()
    }

    return this.makeOneHelper(base, withId)
  }
}
