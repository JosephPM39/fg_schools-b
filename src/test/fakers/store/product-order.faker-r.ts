import type { WithRequired } from '../types'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { IOrder, IProductOrder, IProduct } from '../../../models_school'
import { faker } from '@faker-js/faker'

export interface IProductOrderD {
  order: WithRequired<IOrder, 'id'>
  product: WithRequired<IProduct, 'id'>
}

export class ProductOrderFaker extends BaseFaker<IProductOrder, IProductOrderD> {
  makeOneFake = <C extends WithId = undefined>(params: IProductOrderD, withId?: C): Fake<IProductOrder, C> => {
    const { order, product } = params
    const base: Partial<IProductOrder> = {
      orderId: order.id,
      productId: product.id,
      amount: faker.datatype.number({ min: 1, max: 9999 }),
      inOffer: faker.datatype.boolean()
    }

    return this.makeOneHelper(base, withId)
  }
}
