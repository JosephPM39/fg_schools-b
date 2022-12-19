import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { ISchool } from '../.././../models_school/'

export class SchoolFaker extends BaseFaker<ISchool, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<ISchool, C> => {
    const base: Partial<ISchool> = {
      name: faker.helpers.unique(faker.company.name),
      location: faker.address.streetAddress(),
      code: faker.address.zipCode(),
      icon: faker.helpers.unique(faker.image.avatar)
    }

    return this.makeOneHelper(base, withId)
  }
}
