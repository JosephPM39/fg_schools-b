import { faker } from '@faker-js/faker'
import { IColor } from '../.././../models_school/'
import { v4 as uuidv4 } from 'uuid'
import { EntityFaker, gOneFakeParams, gManyFakesParams } from '../types'
import { manyFakes } from '../model.faker'

const name = () => faker.datatype.string(30)
const sample = () => faker.datatype.string(100)
const available = () => faker.datatype.boolean()
const hex = () => faker.color.rgb()

const generateOneFake = (params?: gOneFakeParams): Partial<IColor> => {
  const id = params?.withId ? { id: uuidv4() } : {}
  return {
    ...id,
    name: name(),
    hex: hex(),
    sample: sample(),
    available: available()
  }
}

const generateManyFakes = (params?: gManyFakesParams) => (
  manyFakes<IColor>({ ...params, generateOneFake })
)

export const colorFaker: EntityFaker<IColor> = {
  generateOneFake,
  generateManyFakes
}
