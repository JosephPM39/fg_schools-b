import { Title, SchoolProm, SectionProm, Position, Employee, EmployeePosition, School, Group } from './schools/'
import { Border, Color, Type, Size, Model, Product, Profile } from './products'
import { Combo, ComboOrder, Order, ProductOrder, ProductCombo, Payment, Student } from './store'
import { Qr, PhotoProduct, Gallery, GalleryAlbum, Album } from './photo'
export { Title, SchoolProm, SectionProm, Position, positionTypes, Employee, EmployeePosition, School, Group } from './schools'
export { ITitle, ISchoolProm, ISectionProm, IPosition, IEmployee, IEmployeePosition, ISchool, IGroup } from './schools'
export { Border, Color, Type, Size, Model, Product, Profile } from './products'
export { IBorder, IColor, IType, ISize, IModel, IProduct, IProfile } from './products'
export { Combo, ComboOrder, Order, orderTypes, ProductOrder, ProductCombo, Payment, Student } from './store'
export { ICombo, IComboOrder, IOrder, IProductOrder, IProductCombo, IPayment, IStudent } from './store'
export { Qr, PhotoProduct, Gallery, GalleryAlbum, Album } from './photo'
export { IQr, IPhotoProduct, IGallery, IGalleryAlbum, IAlbum } from './photo'

export const AllEntities = {
  Group,
  Title,
  School,
  SchoolProm,
  SectionProm,
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
  Student,
  Qr,
  PhotoProduct,
  Gallery,
  GalleryAlbum,
  Album
}

export const EntitiesORM = [
  ...Object.values(AllEntities)
]
