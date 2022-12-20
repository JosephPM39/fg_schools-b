import { faker } from '@faker-js/faker'
import type { WithRequired } from '../types'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { IOrder, IProm, IStudent } from '../../../models_school'

export interface IOrderD {
  student: WithRequired<IStudent, 'id'>
  prom: WithRequired<IProm, 'id'>
}

export class OrderFaker extends BaseFaker<IOrder, IOrderD> {
  makeOneFake = <C extends WithId = undefined>(params: IOrderD, withId?: C): Fake<IOrder, C> => {
    const { student, prom } = params
    const base: Partial<IOrder> = {
      student: student.id,
      prom: prom.id,
      total: parseFloat(faker.commerce.price(0.01, 9999.99)),
      remaining: parseFloat(faker.commerce.price(0.01, 9999.99)),
      details: faker.datatype.string(254)
    }

    return this.makeOneHelper(base, withId)
  }
}
