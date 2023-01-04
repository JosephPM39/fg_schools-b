import { IEmployeePosition, IGroup, ITitle, ISectionProm, ISchoolProm } from '../../../models_school'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { WithRequired } from '../types'

export type ISectionPromFakerD = {
  group: WithRequired<Partial<IGroup>, 'id'>
  title: WithRequired<Partial<ITitle>, 'id'>
  profesor: WithRequired<Partial<IEmployeePosition>, 'id'>
  schoolProm: WithRequired<Partial<ISchoolProm>, 'id'>
}

export class SectionPromFaker extends BaseFaker<ISectionProm, ISectionPromFakerD> {
  makeOneFake = <C extends WithId = undefined>(params: ISectionPromFakerD, withId?: C): Fake<ISectionProm, C> => {
    const base: Partial<ISectionProm> = {
      groupId: params.group.id,
      titleId: params.title.id,
      profesorId: params.profesor.id,
      schoolPromId: params.schoolProm.id
    }

    return this.makeOneHelper(base, withId)
  }
}
