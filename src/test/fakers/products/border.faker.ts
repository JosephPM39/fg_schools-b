import { faker } from '@faker-js/faker'
import { IBorder } from '../.././../models_school/'
import { v4 as uuidv4 } from 'uuid'
import { EntityFaker, gOneFakeParams, gManyFakesParams } from '../types'

const name = () => faker.datatype.string(30)
const file = () => faker.datatype.string(100)
const available = () => faker.datatype.boolean()

const generateOneFake = (params?: gOneFakeParams): Partial<IBorder> => {
  const id = params?.withId ? { id: uuidv4() } : {}
  return {
    ...id,
    name: name(),
    file: file(),
    available: available()
  }
}

const generateManyFakes = (params?: gManyFakesParams) => {
  const fakes: Array<Partial<IBorder>> = []
  const quantity = params?.quantity ?? 10
  for (let i = 0; i < quantity; i++) {
    fakes.push(generateOneFake({ withId: params?.withId }))
  }
  return fakes
}

export const borderFaker: EntityFaker<IBorder> = {
  generateOneFake,
  generateManyFakes
}
