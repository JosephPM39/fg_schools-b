import { faker } from '@faker-js/faker'
import { IEmployeePosition, ISchool, ISchoolProm } from '../../../models_school'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { WithRequired } from '../types'

export type ISchoolPromFakerD = {
  principal: WithRequired<Partial<IEmployeePosition>, 'id'>
  school: WithRequired<Partial<ISchool>, 'id'>
  year?: { n: number }
}

export class SchoolPromFaker extends BaseFaker<ISchoolProm, ISchoolPromFakerD> {
  makeOneFake = <C extends WithId = undefined>(params: ISchoolPromFakerD, withId?: C): Fake<ISchoolProm, C> => {
    const base: Partial<ISchoolProm> = {
      principalId: params.principal.id,
      schoolId: params.school.id,
      year: params.year?.n ?? faker.datatype.number({ min: 1900, max: 9999 })
    }

    return this.makeOneHelper(base, withId)
  }
}
