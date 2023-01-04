import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { IGroup } from '../.././../models_school/'
import { ENV_TEST_CONFIG, MODES } from '../../config'
import { findWithLength } from '../utils'

const fake = (): Partial<IGroup> => {
  if (ENV_TEST_CONFIG.mode === MODES.seeder) {
    return {
      name: findWithLength({ faker: faker.name.jobArea, lessThan: 10 })
    }
  }
  return {
    name: faker.datatype.string(30)
  }
}

export class GroupFaker extends BaseFaker<IGroup, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<IGroup, C> => {
    return this.makeOneHelper(fake(), withId)
  }
}
