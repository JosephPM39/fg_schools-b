export { BaseModel, BaseController, IController } from './base';
import { GroupModel, TitleModel, SchoolModel, PromModel, PositionModel, EmployeeModel, EmployeePositionModel} from './schools/models/'

export const AllEntities = {
  GroupModel,
  TitleModel,
  SchoolModel,
  PromModel,
  PositionModel,
  EmployeeModel,
  EmployeePositionModel
}

export const EntitiesORM = [
  ...Object.values(AllEntities),
]
