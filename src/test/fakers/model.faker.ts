import { IBaseModel } from '../../models_school/base.model'
import { gOneFakeParams } from './types'

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
