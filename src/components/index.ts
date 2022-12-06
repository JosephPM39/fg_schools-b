import { Router } from 'express'
import { Title, Prom, Position, Employee, EmployeePosition } from './schools/models/'
import { SchoolsRoutes } from './schools/routes'
import { Connection as DB } from './../core_db'
import { School } from './schools/models/school.model'
import { Group } from './schools/models/group.model'

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

export const getRoutes = (router: Router, connection: DB) => {
  router.use('/schools', SchoolsRoutes(connection))
}
