import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { IEmployee } from '../.././../models_school/'

export class EmployeeFaker extends BaseFaker<IEmployee, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<IEmployee, C> => {
    const base: Partial<IEmployee> = {
      firstName: faker.datatype.string(40),
      lastName: faker.datatype.string(40),
      contact: faker.datatype.string(55),
      profesion: faker.datatype.string(10)
    }

    return this.makeOneHelper(base, withId)
  }
}
