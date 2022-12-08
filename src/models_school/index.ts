import { Title, Prom, Position, Employee, EmployeePosition, School, Group } from './schools/'
import { Border, Color, Type, Size, Model, Product, Profile } from './products'
import { Combo, ComboOrder, Order, ProductOrder, ProductCombo, Payment, Student } from './store'
export { Title, Prom, Position, Employee, EmployeePosition, School, Group } from './schools'
export { ITitle, IProm, IPosition, IEmployee, IEmployeePosition, ISchool, IGroup } from './schools'
export { Border, Color, Type, Size, Model, Product, Profile } from './products'
export { IBorder, IColor, IType, ISize, IModel, IProduct, IProfile } from './products'
export { Combo, ComboOrder, Order, ProductOrder, ProductCombo, Payment, Student } from './store'
export { ICombo, IComboOrder, IOrder, IProductOrder, IProductCombo, IPayment, IStudent } from './store'

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
  Profile,
  Combo,
  ComboOrder,
  Order,
  ProductOrder,
  ProductCombo,
  Payment,
  Student
}

export const EntitiesORM = [
  ...Object.values(AllEntities)
]
