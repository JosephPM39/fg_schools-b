import type { WithRequired } from '../types'
import { BaseFaker, Fake, WithId, ManyFakesParams } from '../model.faker'
import { ICombo, IComboOrder, IOrder } from '../../../models_school'

export type IComboOrderD = {
  combo: WithRequired<ICombo, 'id'>
  oneOrder: WithRequired<IOrder, 'id'>
  manyOrders: Array<WithRequired<IOrder, 'id'>>
}

export class ComboOrderFaker extends BaseFaker<IComboOrder, IComboOrderD> {
  makeOneFake = <C extends WithId = undefined>(params: IComboOrderD, withId?: C): Fake<IComboOrder, C> => {
    const { combo, oneOrder } = params
    const base: Partial<IComboOrder> = {
      comboId: combo.id,
      orderId: oneOrder.id
    }

    return this.makeOneHelper(base, withId)
  }

  makeManyFake = <C extends WithId = undefined>(params: ManyFakesParams & IComboOrderD, withId?: C | undefined) => {
    const { quantity = this.defaultQuantity, ...r } = params
    const remaining = r as IComboOrderD

    const fakes: Array<Fake<IComboOrder, C>> = []

    for (let i = 0; i < quantity; i++) {
      fakes.push(this.makeOneFake({
        combo: remaining.combo,
        oneOrder: remaining.manyOrders[i],
        manyOrders: remaining.manyOrders
      }, withId))
    }

    return this.makeManyHelper(fakes)
  }
}
