import { faker } from '@faker-js/faker'
import { IEmployeePosition, ISchool, ISchoolProm } from '../../../models_school'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { WithRequired } from '../types'

export type ISchoolPromFakerD = {
  principal: WithRequired<Partial<IEmployeePosition>, 'id'>
  school: WithRequired<Partial<ISchool>, 'id'>
  year?: { n: number } | number[]
}

const getYear = (years: ISchoolPromFakerD['year']) => {
  if (Array.isArray(years)) {
    return faker.helpers.arrayElement(years)
  }
  if (years?.n) {
    return years.n
  }
  return faker.datatype.number({ min: 1900, max: 9999 })
}

export class SchoolPromFaker extends BaseFaker<ISchoolProm, ISchoolPromFakerD> {
  makeOneFake = <C extends WithId = undefined>(params: ISchoolPromFakerD, withId?: C): Fake<ISchoolProm, C> => {
    const base: Partial<ISchoolProm> = {
      principalId: params.principal.id,
      schoolId: params.school.id,
      year: getYear(params.year)
    }

    return this.makeOneHelper(base, withId)
  }
}
