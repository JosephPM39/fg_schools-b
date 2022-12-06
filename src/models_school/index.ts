import { Title, Prom, Position, Employee, EmployeePosition } from './schools/'
import { School } from './schools/school.model'
import { Group } from './schools/group.model'

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
