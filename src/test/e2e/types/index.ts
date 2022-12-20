import { Express } from 'express'
import { Server } from 'http'
import { Connection as DB } from '../../../core_db/'
import { BorderFaker, ColorFaker, ModelFaker, SizeFaker, TypeFaker } from '../../fakers/products'
import { EmployeeFaker, EmployeePositionFaker, GroupFaker, PositionFaker, PromFaker, SchoolFaker, TitleFaker } from '../../fakers/schools'
import { ComboFaker, StudentFaker } from '../../fakers/store'

export enum COMPONENTS {
  Schools = 'schools',
  Products = 'products',
  Store = 'store'
}

export enum ENTITIES {
  // SCHOOLS_ENTITIES
  Employee = '/schools/employee',
  Position = '/schools/position',
  Title = '/schools/title',
  Group = '/schools/group',
  School = '/schools/school',
  EmployeePosition = '/schools/employee-position',
  Prom = '/schools/prom',
  // PRODUCTS_ENTITIES
  Border = '/products/border',
  Color = '/products/color',
  Model = '/products/model',
  Size = '/products/size',
  Type = '/products/type',
  // STORE_ENTITIES
  Combo = '/store/combo',
  Student = '/store/student'
}

export interface Fakers {
  [ENTITIES.School]: SchoolFaker
  [ENTITIES.Prom]: PromFaker
  [ENTITIES.EmployeePosition]: EmployeePositionFaker
  [ENTITIES.Group]: GroupFaker
  [ENTITIES.Title]: TitleFaker
  [ENTITIES.Employee]: EmployeeFaker
  [ENTITIES.Position]: PositionFaker
  [ENTITIES.Border]: BorderFaker
  [ENTITIES.Color]: ColorFaker
  [ENTITIES.Size]: SizeFaker
  [ENTITIES.Model]: ModelFaker
  [ENTITIES.Type]: TypeFaker
  [ENTITIES.Combo]: ComboFaker
  [ENTITIES.Student]: StudentFaker
}

export interface TestMutableParams {
  app?: Express
  server?: Server
  connection?: DB
  fakers?: Fakers
  basePath?: string
  auth?: {
    token?: string
  }
}
