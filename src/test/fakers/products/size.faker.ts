import { faker } from '@faker-js/faker'
import { ISize } from '../.././../models_school/'
import { v4 as uuidv4 } from 'uuid'
import { EntityFaker, gOneFakeParams, gManyFakesParams } from '../types'

const name = () => faker.datatype.string(50)
const width = () => faker.datatype.float({ max: 9999, min: 0.5, precision: 6 })
const height = () => faker.datatype.float({ max: 9999, min: 0.5, precision: 6 })
const ppp = () => faker.datatype.number({ max: 1200, min: 10 })
const available = () => faker.datatype.boolean()

const generateOneFake = (params?: gOneFakeParams): Partial<ISize> => {
  const id = params?.withId ? { id: uuidv4() } : {}
  return {
    ...id,
    name: name(),
    width: width(),
    height: height(),
    ppp: ppp(),
    available: available()
  }
}

const generateManyFakes = (params?: gManyFakesParams) => {
  const fakes: Array<Partial<ISize>> = []
  const quantity = params?.quantity ?? 10
  for (let i = 0; i < quantity; i++) {
    fakes.push(generateOneFake({ withId: params?.withId }))
  }
  return fakes
}

export const sizeFaker: EntityFaker<ISize> = {
  generateOneFake,
  generateManyFakes
}
