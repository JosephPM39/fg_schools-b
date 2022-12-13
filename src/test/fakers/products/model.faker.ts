import { faker } from '@faker-js/faker'
import { IModel } from '../.././../models_school/'
import { v4 as uuidv4 } from 'uuid'
import { EntityFaker, gOneFakeParams, gManyFakesParams } from '../types'

const name = () => faker.datatype.string(50)
const offer = () => parseInt(faker.commerce.price(0.01, 9999.99))
const price = () => parseInt(faker.commerce.price(0.01, 9999.99))
const available = () => faker.datatype.boolean()

const generateOneFake = (params?: gOneFakeParams): Partial<IModel> => {
  const id = params?.withId ? { id: uuidv4() } : {}
  return {
    ...id,
    name: name(),
    offer: offer(),
    price: price(),
    available: available()
  }
}

const generateManyFakes = (params?: gManyFakesParams) => {
  const fakes: Array<Partial<IModel>> = []
  const quantity = params?.quantity ?? 100
  for (let i = 0; i < quantity; i++) {
    fakes.push(generateOneFake({ withId: params?.withId }))
  }
  return fakes
}

export const modelFaker: EntityFaker<IModel> = {
  generateOneFake,
  generateManyFakes
}
