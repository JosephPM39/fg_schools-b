import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { ITitle } from '../.././../models_school/'
import { ENV_TEST_CONFIG, MODES } from '../../config'
import { findWithLength } from '../utils'

const fake = (): Partial<ITitle> => {
  if (ENV_TEST_CONFIG.mode === MODES.seeder) {
    return {
      name: findWithLength({ faker: faker.name.jobTitle, lessThan: 10 })
    }
  }
  return {
    name: faker.datatype.string(100)
  }
}

export class TitleFaker extends BaseFaker<ITitle, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<ITitle, C> => {
    return this.makeOneHelper(fake(), withId)
  }
}
