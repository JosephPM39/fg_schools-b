import { Title, Prom, Position, Employee, EmployeePosition, School, Group } from './schools/'
export { Title, Prom, Position, Employee, EmployeePosition, School, Group } from './schools'
export { ITitle, IProm, IPosition, IEmployee, IEmployeePosition, ISchool, IGroup } from './schools'

export const AllEntities = {
  Group,
  Title,
  School,
  Prom,
  Position,
  Employee,
  EmployeePosition
}

export const EntitiesORM = [
  ...Object.values(AllEntities)
]
