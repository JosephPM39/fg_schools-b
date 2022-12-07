import { faker } from '@faker-js/faker'
import { IColor } from '../.././../models_school/'
import { v4 as uuidv4 } from 'uuid'
import { EntityFaker, gOneFakeParams, gManyFakesParams } from '../types'

const name = () => faker.datatype.string(30)
const sample = () => faker.datatype.string(100)
const available = () => faker.datatype.boolean()

const generateOneFake = (params?: gOneFakeParams): Partial<IColor> => {
  const id = params?.withId ? { id: uuidv4() } : {}
  return {
    ...id,
    name: name(),
    sample: sample(),
    available: available()
  }
}

const generateManyFakes = (params?: gManyFakesParams) => {
  const fakes: Array<Partial<IColor>> = []
  const quantity = params?.quantity ?? 10
  for (let i = 0; i < quantity; i++) {
    fakes.push(generateOneFake({ withId: params?.withId }))
  }
  return fakes
}

export const colorFaker: EntityFaker<IColor> = {
  generateOneFake,
  generateManyFakes
}
