import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { IPosition } from '../.././../models_school/'

export class PositionFaker extends BaseFaker<IPosition, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<IPosition, C> => {
    const base: Partial<IPosition> = {
      name: faker.datatype.string(30)
    }

    return this.makeOneHelper(base, withId)
  }
}
