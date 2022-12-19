import { Express } from 'express'
import { Server } from 'http'
import { Connection as DB } from '../../../core_db/'
import { EmployeeFaker, EmployeePositionFaker, GroupFaker, PositionFaker, PromFaker, SchoolFaker, TitleFaker } from '../../fakers/schools'

export enum SCHOOLS_ENTITIES {
  Employee = 'employee',
  Position = 'position',
  Title = 'title',
  Group = 'group',
  School = 'school',
  EmployeePosition = 'employee-position',
  Prom = 'prom',
}

export enum COMPONENTS {
  Schools = 'schools'
}

export interface TestMutableParams {
  app?: Express
  server?: Server
  connection?: DB
  fakers?: {
    [COMPONENTS.Schools]: {
      [SCHOOLS_ENTITIES.School]: SchoolFaker
      [SCHOOLS_ENTITIES.Prom]: PromFaker
      [SCHOOLS_ENTITIES.EmployeePosition]: EmployeePositionFaker
      [SCHOOLS_ENTITIES.Group]: GroupFaker
      [SCHOOLS_ENTITIES.Title]: TitleFaker
      [SCHOOLS_ENTITIES.Employee]: EmployeeFaker
      [SCHOOLS_ENTITIES.Position]: PositionFaker
    }
  }
  auth?: {
    token?: string
  }
}
