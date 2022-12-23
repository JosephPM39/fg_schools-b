import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { IPosition } from '../.././../models_school/'
import { ENV_TEST_CONFIG, MODES } from '../../config'
import { findWithLength } from '../utils'

const fake = (): Partial<IPosition> => {
  if (ENV_TEST_CONFIG.mode === MODES.seeder) {
    return {
      name: findWithLength({ faker: faker.name.jobTitle, lessThan: 30 })
    }
  }
  return {
    name: faker.datatype.string(30)
  }
}

export class PositionFaker extends BaseFaker<IPosition, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<IPosition, C> => {
    return this.makeOneHelper(fake(), withId)
  }
}
