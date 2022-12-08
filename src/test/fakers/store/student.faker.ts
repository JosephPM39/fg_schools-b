import { faker } from '@faker-js/faker'
import { IStudent } from '../.././../models_school/'
import { v4 as uuidv4 } from 'uuid'
import { EntityFaker, gOneFakeParams, gManyFakesParams } from '../types'

const firstName = () => faker.datatype.string(40)
const lastName = () => faker.datatype.string(40)
const nickName = () => faker.datatype.string(100)

const generateOneFake = (params?: gOneFakeParams): Partial<IStudent> => {
  const id = params?.withId ? { id: uuidv4() } : {}
  return {
    ...id,
    firstName: firstName(),
    lastName: lastName(),
    nickName: nickName()
  }
}

const generateManyFakes = (params?: gManyFakesParams) => {
  const fakes: Array<Partial<IStudent>> = []
  const quantity = params?.quantity ?? 10
  for (let i = 0; i < quantity; i++) {
    fakes.push(generateOneFake({ withId: params?.withId }))
  }
  return fakes
}

export const studentFaker: EntityFaker<IStudent> = {
  generateOneFake,
  generateManyFakes
}
