import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { IEmployee } from '../.././../models_school/'
import { ENV_TEST_CONFIG, MODES } from '../../config'
import { findWithLength } from '../utils'

const fake = (): Partial<IEmployee> => {
  if (ENV_TEST_CONFIG.mode === MODES.seeder) {
    return {
      firstName: findWithLength({ faker: faker.name.firstName, lessThan: 40 }),
      lastName: findWithLength({ faker: faker.name.lastName, lessThan: 40 }),
      contact: findWithLength({ faker: faker.phone.number, lessThan: 55 }),
      profesion: findWithLength({ faker: faker.name.jobType, lessThan: 10 })
    }
  }
  return {
    firstName: faker.datatype.string(40),
    lastName: faker.datatype.string(40),
    contact: faker.datatype.string(55),
    profesion: faker.datatype.string(10)
  }
}

export class EmployeeFaker extends BaseFaker<IEmployee, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<IEmployee, C> => {
    return this.makeOneHelper(fake(), withId)
  }
}
