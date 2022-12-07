import { faker } from '@faker-js/faker'
import { ITitle } from '../.././../models_school/'
import { v4 as uuidv4 } from 'uuid'
import { EntityFaker, gOneFakeParams, gManyFakesParams } from '../types'

const name = () => faker.datatype.string(100)

const generateOneFake = (params?: gOneFakeParams): Partial<ITitle> => {
  const id = params?.withId ? { id: uuidv4() } : {}
  return {
    ...id,
    name: name()
  }
}

const generateManyFakes = (params?: gManyFakesParams) => {
  const fakes: Array<Partial<ITitle>> = []
  const quantity = params?.quantity ?? 10
  for (let i = 0; i < quantity; i++) {
    fakes.push(generateOneFake({ withId: params?.withId }))
  }
  return fakes
}

export const titleFaker: EntityFaker<ITitle> = {
  generateOneFake,
  generateManyFakes
}