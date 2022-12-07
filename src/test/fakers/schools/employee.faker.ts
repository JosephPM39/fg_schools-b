import { faker } from '@faker-js/faker'
import { IEmployee } from '../.././../models_school/'
import { v4 as uuidv4 } from 'uuid'
import { EntityFaker, gOneFakeParams, gManyFakesParams } from '../types'

const firstName = () => faker.datatype.string(40)
const lastName = () => faker.datatype.string(40)
const contact = () => faker.datatype.string(55)
const profesion = () => faker.datatype.string(10)

const generateOneFake = (params?: gOneFakeParams): Partial<IEmployee> => {
  const id = params?.withId ? { id: uuidv4() } : {}
  return {
    ...id,
    firstName: firstName(),
    lastName: lastName(),
    contact: contact(),
    profesion: profesion()
  }
}

const generateManyFakes = (params?: gManyFakesParams) => {
  const fakes: Array<Partial<IEmployee>> = []
  const quantity = params?.quantity ?? 10
  for (let i = 0; i < quantity; i++) {
    fakes.push(generateOneFake({ withId: params?.withId }))
  }
  return fakes
}

export const employeeFaker: EntityFaker<IEmployee> = {
  generateOneFake,
  generateManyFakes
}