import { faker } from '@faker-js/faker'
import { IBorder, IColor, IModel, IProfile, ISize, IType } from '../../../models_school'
import type { WithRequired } from '../types'
import { BaseFaker, Fake, WithId } from '../model.faker'

export type IProfileD = {
  model: WithRequired<IModel, 'id'>
  size: WithRequired<ISize, 'id'>
  color: WithRequired<IColor, 'id'>
  border: WithRequired<IBorder, 'id'>
  type: WithRequired<IType, 'id'>
}

export class ProfileFaker extends BaseFaker<IProfile, IProfileD> {
  makeOneFake = <C extends WithId = undefined>(params: IProfileD, withId?: C): Fake<IProfile, C> => {
    const { model, size, color, border, type } = params
    const base: Partial<IProfile> = {
      name: faker.datatype.string(30),
      modelId: model.id,
      colorId: color.id,
      borderId: border.id,
      sizeId: size.id,
      typeId: type.id,
      available: faker.datatype.boolean()
    }

    return this.makeOneHelper(base, withId)
  }
}
