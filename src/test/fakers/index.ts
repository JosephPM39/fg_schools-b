import { EmployeeFaker, EmployeePositionFaker, GroupFaker, PositionFaker, PromFaker, SchoolFaker, TitleFaker } from '../fakers/schools'
import { BorderFaker, ColorFaker, ModelFaker, SizeFaker, TypeFaker } from '../fakers/products'
import { ComboFaker, StudentFaker } from '../fakers/store'
import { ENTITIES, Fakers } from '../e2e/types'

export const GetApiFakers = () => {
  const fakers: Fakers = {
    // SCHOOLS_ENTITIES
    [ENTITIES.Employee]: new EmployeeFaker(),
    [ENTITIES.Position]: new PositionFaker(),
    [ENTITIES.Title]: new TitleFaker(),
    [ENTITIES.Group]: new GroupFaker(),
    [ENTITIES.School]: new SchoolFaker(),
    [ENTITIES.EmployeePosition]: new EmployeePositionFaker(),
    [ENTITIES.Prom]: new PromFaker(),
    // PRODUCTS_ENTITIES
    [ENTITIES.Border]: new BorderFaker(),
    [ENTITIES.Color]: new ColorFaker(),
    [ENTITIES.Model]: new ModelFaker(),
    [ENTITIES.Size]: new SizeFaker(),
    [ENTITIES.Type]: new TypeFaker(),
    // STORE_ENTITIES
    [ENTITIES.Combo]: new ComboFaker(),
    [ENTITIES.Student]: new StudentFaker()
  }

  // SCHOOLS_ENTITIES
  fakers[ENTITIES.Group].makeFakesPack({})
  fakers[ENTITIES.Position].makeFakesPack({})
  fakers[ENTITIES.Employee].makeFakesPack({})
  fakers[ENTITIES.School].makeFakesPack({})
  fakers[ENTITIES.Title].makeFakesPack({})
  fakers[ENTITIES.EmployeePosition].makeFakesPack({
    employee: fakers[ENTITIES.Employee].getFakes().manyWithId[0],
    position: fakers[ENTITIES.Position].getFakes().manyWithId[0]
  })
  fakers[ENTITIES.Prom].makeFakesPack({
    group: fakers[ENTITIES.Group].getFakes().manyWithId[0],
    title: fakers[ENTITIES.Title].getFakes().manyWithId[0],
    profesor: fakers[ENTITIES.EmployeePosition].getFakes().manyWithId[0],
    principal: fakers[ENTITIES.EmployeePosition].getFakes().manyWithId[1],
    school: fakers[ENTITIES.School].getFakes().manyWithId[0]
  })
  // PRODUCTS_ENTITIES
  fakers[ENTITIES.Border].makeFakesPack({})
  fakers[ENTITIES.Color].makeFakesPack({})
  fakers[ENTITIES.Model].makeFakesPack({})
  fakers[ENTITIES.Size].makeFakesPack({})
  fakers[ENTITIES.Type].makeFakesPack({})
  // SCHOOLS_ENTITIES
  fakers[ENTITIES.Combo].makeFakesPack({})
  fakers[ENTITIES.Student].makeFakesPack({})

  return fakers
}
