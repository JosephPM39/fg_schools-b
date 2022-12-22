import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import { IEmployeePosition, IGroup, ISchool, ITitle, IProm } from '../../../models_school'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { WithRequired } from '../types'

export interface IPromFakerD {
  group: WithRequired<Partial<IGroup>, 'id'>
  title: WithRequired<Partial<ITitle>, 'id'>
  profesor: WithRequired<Partial<IEmployeePosition>, 'id'>
  principal: WithRequired<Partial<IEmployeePosition>, 'id'>
  school: WithRequired<Partial<ISchool>, 'id'>
}

export class PromFaker extends BaseFaker<IProm, IPromFakerD> {
  makeOneFake = <C extends WithId = undefined>(params: IPromFakerD, withId?: C): Fake<IProm, C> => {
    const base: Partial<IProm> = {
      groupId: params.group.id,
      titleId: params.title.id,
      profesorId: params.profesor.id,
      principalId: params.principal.id,
      schoolId: params.school.id,
      year: faker.datatype.number({ min: 1900, max: 9999 })
    }

    if (withId === 'withId') {
      const res = {
        id: uuidv4(),
        ...base
      }
      this.fakes.oneWithId = res
      return res
    }

    this.fakes.oneWithoutId = base
    return base as any
  }
}
