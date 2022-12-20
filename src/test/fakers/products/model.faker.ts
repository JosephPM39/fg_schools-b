import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { IModel } from '../.././../models_school/'

export class ModelFaker extends BaseFaker<IModel, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<IModel, C> => {
    const base: Partial<IModel> = {
      name: faker.datatype.string(50),
      offer: parseFloat(faker.commerce.price(0.01, 9999.99)),
      price: parseFloat(faker.commerce.price(0.01, 9999.99)),
      available: faker.datatype.boolean()
    }

    return this.makeOneHelper(base, withId)
  }
}
