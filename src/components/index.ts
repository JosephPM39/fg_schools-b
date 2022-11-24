import { Group, Title, School, Prom, Position, Employee, EmployeePosition } from './schools/models/'
export { BaseModel, BaseController, IController, EXPOSE_VERSIONS } from './base'
export { DB } from '../db'

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
