import { IBaseModel } from '../../models_school/base.model'
import { gOneFakeParams, WithRequired } from './types'

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

// NEW CODE

interface ManyFakesParams {
  quantity?: number
}

export type WithId = 'withId' | undefined

export interface Fakes<Entity extends IBaseModel> {
  manyWithId: Array<WithRequired<Partial<Entity>, 'id'>>
  manyWithoutId: Array<Partial<Entity>>
  oneWithId: WithRequired<Partial<Entity>, 'id'>
  oneWithoutId: Partial<Entity>
}

export type Fake<Entity extends IBaseModel, C extends WithId> = C extends 'withId' ? Fakes<Entity>['oneWithId'] : Fakes<Entity>['oneWithoutId']
export type FakesArray<Entity extends IBaseModel, C extends WithId> = Array<Fake<Entity, C>>

export const containsId = <Entity extends IBaseModel>(
  fakes: Fakes<Entity>['oneWithoutId'] | Fakes<Entity>['oneWithId']
): fakes is Fakes<Entity>['oneWithId'] => {
  return (fakes as Fakes<Entity>['oneWithId'])?.id !== undefined
}

const arrayContainsId = <Entity extends IBaseModel>(
  fakes: Fakes<Entity>['manyWithoutId'] | Fakes<Entity>['manyWithId']
): fakes is Fakes<Entity>['manyWithId'] => {
  return (fakes as Fakes<Entity>['manyWithId'])[0]?.id !== undefined
}

// is necessary add condicional type for make oneFake
export abstract class BaseFaker<Entity extends IBaseModel, D extends {} = {}> {
  protected fakes: Partial<Fakes<Entity>> = {
    oneWithId: undefined,
    oneWithoutId: {},
    manyWithId: [],
    manyWithoutId: []
  }

  makeOneFake: <C extends WithId = undefined>(params: D, withId?: C) => Fake<Entity, C>
  makeManyFake = <C extends WithId = undefined>(params: ManyFakesParams & D, withId?: C): void => {
    const { quantity = 100, ...r } = params
    const remaining = r as D

    const fakes: FakesArray<Entity, C> = []

    for (let i = 0; i < quantity; i++) {
      fakes.push(this.makeOneFake(remaining, withId))
    }

    if (arrayContainsId(fakes)) {
      this.fakes.manyWithId = fakes
    }

    if (!arrayContainsId(fakes)) {
      this.fakes.manyWithoutId = fakes
    }
  }

  getFakes = () => {
    return this.fakes
  }
}
