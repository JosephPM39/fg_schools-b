import { faker } from '@faker-js/faker'
import type { WithRequired } from '../types'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { IOrder, ISectionProm, IStudent, orderTypes } from '../../../models_school'

export type IOrderD = {
  student: WithRequired<IStudent, 'id'>
  sectionProm: WithRequired<ISectionProm, 'id'>
}

export class OrderFaker extends BaseFaker<IOrder, IOrderD> {
  makeOneFake = <C extends WithId = undefined>(params: IOrderD, withId?: C): Fake<IOrder, C> => {
    const { student, sectionProm } = params
    const base: Partial<IOrder> = {
      studentId: student.id,
      sectionPromId: sectionProm.id,
      total: parseFloat(faker.commerce.price(0.01, 9999.99)),
      remaining: parseFloat(faker.commerce.price(0.01, 9999.99)),
      details: faker.datatype.string(254),
      type: faker.helpers.arrayElement(orderTypes)
    }

    return this.makeOneHelper(base, withId)
  }
}
