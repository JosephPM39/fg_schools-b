import { PhotoFaker, PhotoProductFaker, QrFaker } from '../photos'
import { BorderFaker, ColorFaker, ModelFaker, ProductFaker, ProfileFaker, SizeFaker, TypeFaker } from '../products'
import { EmployeeFaker, EmployeePositionFaker, GroupFaker, PositionFaker, PromFaker, SchoolFaker, TitleFaker } from '../schools'
import { ComboFaker, StudentFaker, ComboOrderFaker, OrderFaker, PaymentFaker, ProductOrderFaker, ProductComboFaker } from '../store'

export type WithRequired<T, K extends keyof T> = { [P in keyof T]?: T[P] | undefined } & { [P in K]-?: T[P] }
export type ArrayProperties<T> = { [P in keyof T]: Array<T[P]> }

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends ReadonlyArray<(infer ElementType)> ? ElementType : never

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
  ProductCombo = '/store/product-combo',
  // PHOTOS_ENTITIES
  Photo = '/photos/photo',
  Qr = '/photos/qr',
  PhotoProduct = '/photos/photo-product'
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
  // PHOTOS_ENTITIES
  [ENTITIES.Photo]: PhotoFaker
  [ENTITIES.Qr]: QrFaker
  [ENTITIES.PhotoProduct]: PhotoProductFaker
}
