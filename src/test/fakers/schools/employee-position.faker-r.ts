import { IEmployee, IEmployeePosition, IPosition } from '../../../models_school'
import { v4 as uuidv4 } from 'uuid'
import type { EntityFaker, WithRequired } from '../types'
import { BaseFaker, Fake, WithId } from '../model.faker'

interface MakeFakeParams {
  withId?: boolean
  employeeFaker: EntityFaker<IEmployee>
  positionFaker: EntityFaker<IPosition>
}

interface MakeManyFakesParams extends MakeFakeParams {
  quantity?: number
}

interface OneFaked {
  fake: Partial<IEmployeePosition>
  employee: Partial<IEmployee>
  position: Partial<IPosition>
}

interface ManyFaked {
  fakes: Array<Partial<IEmployeePosition>>
  employees: Array<Partial<IEmployee>>
  positions: Array<Partial<IPosition>>
}

const makeOneFake = (params: MakeFakeParams): OneFaked => {
  const id = params?.withId ? { id: uuidv4() } : {}
  const employee = params.employeeFaker.generateOneFake({ withId: true })
  const position = params.positionFaker.generateOneFake({ withId: true })
  const fake = {
    ...id,
    employee: employee.id,
    position: position.id
  }
  return {
    fake,
    employee,
    position
  }
}

const makeManyFakes = (params: MakeManyFakesParams): ManyFaked => {
  const { quantity = 100, ...oneFakeParams } = params
  const res: ManyFaked = { fakes: [], employees: [], positions: [] }
  for (let i = 0; i < quantity; i++) {
    const { fake, employee, position } = makeOneFake(oneFakeParams)
    res.fakes.push(fake)
    res.positions.push(position)
    res.employees.push(employee)
  }
  return res
}

export interface D {
  employee: WithRequired<Partial<IEmployee>, 'id'>
  position: WithRequired<Partial<IPosition>, 'id'>
}

export class EmployeePositionFaker extends BaseFaker<IEmployeePosition, D> {
  makeOneFake = <C extends WithId = undefined>(params: D, withId?: C): Fake<IEmployeePosition, C> => {
    const { employee, position } = params
    const base: Partial<IEmployeePosition> = {
      employee: employee.id,
      position: position.id
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

export const employeePositionFaker = {
  makeOneFake,
  makeManyFakes
}
