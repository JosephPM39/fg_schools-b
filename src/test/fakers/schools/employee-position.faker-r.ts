import { IEmployee, IEmployeePosition, IPosition } from '../../../models_school'
import type { WithRequired } from '../types'
import { BaseFaker, Fake, WithId } from '../model.faker'

export interface IEmployeePositionFakerD {
  employee: WithRequired<IEmployee, 'id'>
  position: WithRequired<IPosition, 'id'>
}

export class EmployeePositionFaker extends BaseFaker<IEmployeePosition, IEmployeePositionFakerD> {
  makeOneFake = <C extends WithId = undefined>(params: IEmployeePositionFakerD, withId?: C): Fake<IEmployeePosition, C> => {
    const { employee, position } = params
    const base: Partial<IEmployeePosition> = {
      employeeId: employee.id,
      positionId: position.id
    }

    return this.makeOneHelper(base, withId)
  }
}
