import { IBaseModel } from '../../models_school/base.model'
import { ArrayProperties, WithRequired } from './types'
import { v4 as uuidv4 } from 'uuid'
import { pairProps } from './utils'

export interface ManyFakesParams {
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

export const containsId = <Entity extends IBaseModel>(
  fakes: Fakes<Entity>['oneWithoutId'] | Fakes<Entity>['oneWithId']
): fakes is Fakes<Entity>['oneWithId'] => {
  return (fakes as Fakes<Entity>['oneWithId'])?.id !== undefined
}

export const arrayContainsId = <Entity extends IBaseModel>(
  fakes: Fakes<Entity>['manyWithoutId'] | Fakes<Entity>['manyWithId']
): fakes is Fakes<Entity>['manyWithId'] => {
  return (fakes as Fakes<Entity>['manyWithId'])[0]?.id !== undefined
}

const getInitFakes = <Entity extends IBaseModel>() => ({
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  oneWithId: {
    id: 'test'
  } as Fakes<Entity>['oneWithId'],
  oneWithoutId: {},
  manyWithId: [],
  manyWithoutId: []
})

export abstract class BaseFaker<Entity extends IBaseModel, D extends { [key: string]: object } = {}> {
  protected fakes: Fakes<Entity> = getInitFakes<Entity>()
  protected defaultQuantity = 100

  makeOneFake: <C extends WithId = undefined>(params: D, withId?: C) => Fake<Entity, C>
  makeManyFake = <C extends WithId = undefined>(params: ManyFakesParams & D, withId?: C): void => {
    const { quantity = this.defaultQuantity, ...r } = params
    const remaining = r as D

    const fakes: Array<Fake<Entity, C>> = []

    for (let i = 0; i < quantity; i++) {
      fakes.push(this.makeOneFake(remaining, withId))
    }
    return this.makeManyHelper(fakes)
  }

  makeManyFakeWithManyD = <C extends WithId = undefined>(params: ArrayProperties<D>, withId?: C): void => {
    const props = pairProps(params)
    const fakes: Array<Fake<Entity, C>> = props.map((d) => this.makeOneFake(d, withId))
    return this.makeManyHelper(fakes)
  }

  makeFakesPack = (params: D & ManyFakesParams) => {
    this.makeManyFake(params)
    this.makeManyFake(params, 'withId')
    this.makeOneFake(params)
    this.makeOneFake(params, 'withId')
  }

  makeFakesPackWithManyD = (params: ArrayProperties<D>) => {
    const one = pairProps(params)[0]
    this.makeManyFakeWithManyD(params)
    this.makeManyFakeWithManyD(params, 'withId')
    this.makeOneFake(one)
    this.makeOneFake(one, 'withId')
  }

  clearFakes = () => {
    this.fakes = getInitFakes<Entity>()
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

  protected readonly makeManyHelper = <C extends WithId>(fakes: Array<Fake<Entity, C>>) => {
    if (arrayContainsId(fakes)) {
      this.fakes.manyWithId = [
        ...this.fakes.manyWithId,
        ...fakes
      ]
    }

    if (!arrayContainsId(fakes)) {
      this.fakes.manyWithoutId = [
        ...this.fakes.manyWithoutId,
        ...fakes
      ]
    }
  }

  getFakes = () => {
    return this.fakes
  }
}
