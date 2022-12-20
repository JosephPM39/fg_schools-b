import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { IStudent } from '../.././../models_school/'

export class StudentFaker extends BaseFaker<IStudent, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<IStudent, C> => {
    const base: Partial<IStudent> = {
      firstName: faker.datatype.string(40),
      lastName: faker.datatype.string(40),
      nickName: faker.datatype.string(100)
    }

    return this.makeOneHelper(base, withId)
  }
}
