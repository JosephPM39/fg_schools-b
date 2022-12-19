import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { IGroup } from '../.././../models_school/'

export class GroupFaker extends BaseFaker<IGroup, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<IGroup, C> => {
    const base: Partial<IGroup> = {
      name: faker.datatype.string(30)
    }

    return this.makeOneHelper(base, withId)
  }
}
