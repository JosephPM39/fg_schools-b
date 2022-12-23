import { faker } from '@faker-js/faker'
import type { WithRequired } from '../types'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { IOrder, IPayment } from '../../../models_school'

export type IPaymentD = {
  order: WithRequired<IOrder, 'id'>
}

export class PaymentFaker extends BaseFaker<IPayment, IPaymentD> {
  makeOneFake = <C extends WithId = undefined>(params: IPaymentD, withId?: C): Fake<IPayment, C> => {
    const { order } = params
    const base: Partial<IPayment> = {
      orderId: order.id,
      total: parseFloat(faker.commerce.price(0.01, 9999.99)),
      details: faker.datatype.string(254),
      date: faker.date.recent()
    }

    return this.makeOneHelper(base, withId)
  }
}
