import { faker } from '@faker-js/faker'
import { ISchool } from '../../../components/schools/models/school.model'
import { v4 as uuidv4 } from 'uuid'

const name = () => faker.helpers.unique(faker.company.name)
const location = () => faker.address.streetAddress()
const code = () => faker.address.zipCode()
const icon = () => faker.helpers.unique(faker.image.avatar)

const generateOneFake = (withId?: boolean): Partial<ISchool> => {
  const id = withId ? { id: uuidv4() } : {}
  return {
    ...id,
    name: name(),
    location: location(),
    code: code(),
    icon: icon()
  }
}

const generateManyFakes = (quantity: number = 10, withId?: boolean) => {
  const fakes: Array<Partial<ISchool>> = []
  for (let i = 0; i < quantity; i++) {
    fakes.push(generateOneFake(withId))
  }
  return fakes
}

export const schoolFaker = {
  generateOneFake,
  generateManyFakes
}
