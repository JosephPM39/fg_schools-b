import { IBaseModel } from '../../models_school/base.model'
import { WithRequired } from './types'
import { v4 as uuidv4 } from 'uuid'

// NEW CODE

interface ManyFakesParams {
  quantity?: number
}

export type WithId = 'withId' | undefined

export interface Fakes<Entity extends IBaseModel> {
  manyWithId: Array<WithRequired<Entity, 'id'>>
  manyWithoutId: Array<Partial<Entity>>
  oneWithId: WithRequired<Entity, 'id'>
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

export abstract class BaseFaker<Entity extends IBaseModel, D extends {} = {}> {
  protected fakes: Fakes<Entity> = {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    oneWithId: {
      id: 'test'
    } as Fakes<Entity>['oneWithId'],
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

  makeFakesPack = (params: D) => {
    this.makeManyFake(params)
    this.makeManyFake(params, 'withId')
    this.makeOneFake(params)
    this.makeOneFake(params, 'withId')
  }

  protected readonly makeOneHelper = <C extends WithId = undefined>(base: Partial<Entity>, withId?: C): Fake<Entity, C> => {
    if (withId === 'withId') {
      const res = {
        id: uuidv4(),
        ...base
      }
      this.fakes.oneWithId = res
      return res
    }

    this.fakes.oneWithoutId = base
    return base as any
  }

  getFakes = () => {
    return this.fakes
  }
}
