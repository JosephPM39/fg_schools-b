import { faker } from '@faker-js/faker'
import { ISchool } from '../../../components/schools/models/school.model'

const name = () => faker.helpers.unique(faker.company.name)
const location = () => faker.address.streetAddress()
const code = () => faker.address.zipCode()
const icon = () => faker.helpers.unique(faker.image.avatar)

export const generateOneFake = (): Partial<ISchool> => ({
  name: name(),
  location: location(),
  code: code(),
  icon: icon()
})

export const generateManyFakes = (quantity: number = 10) => {
  const fakes: Array<Partial<ISchool>> = []
  for (let i = 0; i < quantity; i++) {
    fakes.push(generateOneFake())
  }
  return fakes
}
