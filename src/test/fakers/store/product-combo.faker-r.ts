import type { WithRequired } from '../types'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { ICombo, IProductCombo, IProduct } from '../../../models_school'
import { faker } from '@faker-js/faker'

export type IProductComboD = {
  combo: WithRequired<ICombo, 'id'>
  product: WithRequired<IProduct, 'id'>
}

export class ProductComboFaker extends BaseFaker<IProductCombo, IProductComboD> {
  makeOneFake = <C extends WithId = undefined>(params: IProductComboD, withId?: C): Fake<IProductCombo, C> => {
    const { combo, product } = params
    const base: Partial<IProductCombo> = {
      comboId: combo.id,
      productId: product.id,
      amount: faker.datatype.number({ min: 1, max: 9999 }),
      inOffer: faker.datatype.boolean()
    }

    return this.makeOneHelper(base, withId)
  }
}
