import { Express } from 'express'
import { Server } from 'http'
import { Connection as DB } from '../../../core_db/'
import { BorderFaker, ColorFaker, ModelFaker, ProductFaker, ProfileFaker, SizeFaker, TypeFaker } from '../../fakers/products'
import { EmployeeFaker, EmployeePositionFaker, GroupFaker, PositionFaker, PromFaker, SchoolFaker, TitleFaker } from '../../fakers/schools'
import { ComboFaker, StudentFaker, ComboOrderFaker, OrderFaker, PaymentFaker, ProductOrderFaker, ProductComboFaker } from '../../fakers/store'

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
  Product = '/products/product',
  Profile = '/products/profile',
  // STORE_ENTITIES
  Combo = '/store/combo',
  Student = '/store/student',
  Order = '/store/order',
  Payment = '/store/payment',
  ComboOrder = '/store/combo-order',
  ProductOrder = '/store/product-order',
  ProductCombo = '/store/product-combo'
}

export interface Fakers {
  // SCHOOLS_ENTITIES
  [ENTITIES.Employee]: EmployeeFaker
  [ENTITIES.Position]: PositionFaker
  [ENTITIES.Title]: TitleFaker
  [ENTITIES.Group]: GroupFaker
  [ENTITIES.School]: SchoolFaker
  [ENTITIES.EmployeePosition]: EmployeePositionFaker
  [ENTITIES.Prom]: PromFaker
  // PRODUCTS_ENTITIES
  [ENTITIES.Border]: BorderFaker
  [ENTITIES.Color]: ColorFaker
  [ENTITIES.Model]: ModelFaker
  [ENTITIES.Size]: SizeFaker
  [ENTITIES.Type]: TypeFaker
  [ENTITIES.Product]: ProductFaker
  [ENTITIES.Profile]: ProfileFaker
  // STORE_ENTITIES
  [ENTITIES.Combo]: ComboFaker
  [ENTITIES.Student]: StudentFaker
  [ENTITIES.Order]: OrderFaker
  [ENTITIES.Payment]: PaymentFaker
  [ENTITIES.ComboOrder]: ComboOrderFaker
  [ENTITIES.ProductOrder]: ProductOrderFaker
  [ENTITIES.ProductCombo]: ProductComboFaker
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
