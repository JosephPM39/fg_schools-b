import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { ISchool } from '../.././../models_school/'
import { ENV_TEST_CONFIG, MODES } from '../../config'

const fake = (): Partial<ISchool> => {
  if (ENV_TEST_CONFIG.mode === MODES.seeder) {
    return {
      name: faker.helpers.unique(faker.company.name),
      location: faker.address.streetAddress(),
      code: faker.address.zipCode(),
      icon: faker.helpers.unique(faker.image.avatar)
    }
  }
  return {
    name: faker.datatype.string(100),
    location: faker.datatype.string(254),
    code: faker.datatype.string(30),
    icon: faker.datatype.string(100)
  }
}

export class SchoolFaker extends BaseFaker<ISchool, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<ISchool, C> => {
    return this.makeOneHelper(fake(), withId)
  }
}
