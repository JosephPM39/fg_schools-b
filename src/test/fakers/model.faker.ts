import { IBaseModel } from '../../models_school/base.model'
import { gOneFakeParams, WithRequired } from './types'

interface OneFakeParams {
  withId?: boolean
}

interface ManyFakesParams {
  quantity?: number
}

export const manyFakes = <Model extends IBaseModel>({
  withId,
  generateOneFake,
  quantity = 100
}: {
  withId?: boolean
  generateOneFake: (params?: gOneFakeParams) => Partial<Model>
  quantity?: number
}): Array<Partial<Model>> => {
  const fakes: Array<Partial<Model>> = []
  for (let i = 0; i < quantity; i++) {
    fakes.push(generateOneFake({ withId }))
  }
  return fakes
}

interface Fakes<Entity extends IBaseModel> {
  manyWithId: Array<WithRequired<Entity, 'id'>>
  manyWithoutId: Array<Partial<Entity>>
  oneWithId: WithRequired<Entity, 'id'>
  oneWithoutId: Partial<Entity>
}
// is necessary add condicional type for make oneFake
export class BaseFaker<Entity extends IBaseModel, Dependencies> {
  fakes: Fakes<Entity> = {
    manyWithId: [],
    manyWithoutId: []
  }

  makeOneFake: (params: OneFakeParams | Dependencies & OneFakeParams) => Partial<Entity>
  makeManyFake = (params: ManyFakesParams & Dependencies & OneFakeParams): void => {
    const { quantity = 100, ...remaining } = params
    const fakes: Array<Partial<Entity>> = []
    for (let i = 0; i < quantity; i++) {
      fakes.push(this.makeOneFake(remaining))
    }
    if (params.withId) {
      this.fakes.manyWithId = fakes
    }
    if (!params.withId) {
      this.fakes.manyWithoutId = fakes
    }
  }
}
