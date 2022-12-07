import { Title, Prom, Position, Employee, EmployeePosition, School, Group } from './schools/'
import { Border, Color, Type, Size, Model, Product, Profile } from './products'
export { Title, Prom, Position, Employee, EmployeePosition, School, Group } from './schools'
export { ITitle, IProm, IPosition, IEmployee, IEmployeePosition, ISchool, IGroup } from './schools'
export { Border, Color, Type, Size, Model, Product, Profile } from './products'
export { IBorder, IColor, IType, ISize, IModel, IProduct, IProfile } from './products'

export const AllEntities = {
  Group,
  Title,
  School,
  Prom,
  Position,
  Employee,
  EmployeePosition,
  Border,
  Color,
  Type,
  Size,
  Model,
  Product,
  Profile
}

export const EntitiesORM = [
  ...Object.values(AllEntities)
]
