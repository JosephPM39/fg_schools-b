import { faker } from '@faker-js/faker'
import { ISchool } from '../.././../models_school/'
import { v4 as uuidv4 } from 'uuid'
import { EntityFaker, gOneFakeParams, gManyFakesParams } from '../types'

const name = () => faker.helpers.unique(faker.company.name)
const location = () => faker.address.streetAddress()
const code = () => faker.address.zipCode()
const icon = () => faker.helpers.unique(faker.image.avatar)

const generateOneFake = (params?: gOneFakeParams): Partial<ISchool> => {
  const id = params?.withId ? { id: uuidv4() } : {}
  return {
    ...id,
    name: name(),
    location: location(),
    code: code(),
    icon: icon()
  }
}

const generateManyFakes = (params?: gManyFakesParams) => {
  const fakes: Array<Partial<ISchool>> = []
  const quantity = params?.quantity ?? 10
  for (let i = 0; i < quantity; i++) {
    fakes.push(generateOneFake({ withId: params?.withId }))
  }
  return fakes
}

export const schoolFaker: EntityFaker<ISchool> = {
  generateOneFake,
  generateManyFakes
}
