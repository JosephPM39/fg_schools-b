import { EmployeeFaker, EmployeePositionFaker, GroupFaker, PositionFaker, PromFaker, SchoolFaker, TitleFaker } from '../fakers/schools'
import { BorderFaker, ColorFaker, ModelFaker, ProductFaker, ProfileFaker, SizeFaker, TypeFaker } from '../fakers/products'
import { ComboFaker, StudentFaker, OrderFaker, PaymentFaker, ComboOrderFaker, ProductOrderFaker, ProductComboFaker } from '../fakers/store'
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
    [ENTITIES.Product]: new ProductFaker(),
    [ENTITIES.Profile]: new ProfileFaker(),
    // STORE_ENTITIES
    [ENTITIES.Combo]: new ComboFaker(),
    [ENTITIES.Student]: new StudentFaker(),
    [ENTITIES.Order]: new OrderFaker(),
    [ENTITIES.Payment]: new PaymentFaker(),
    [ENTITIES.ComboOrder]: new ComboOrderFaker(),
    [ENTITIES.ProductOrder]: new ProductOrderFaker(),
    [ENTITIES.ProductCombo]: new ProductComboFaker()

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
  fakers[ENTITIES.Product].makeFakesPack({
    model: fakers[ENTITIES.Model].getFakes().manyWithId[0],
    color: fakers[ENTITIES.Color].getFakes().manyWithId[0],
    size: fakers[ENTITIES.Size].getFakes().manyWithId[0],
    border: fakers[ENTITIES.Border].getFakes().manyWithId[0],
    type: fakers[ENTITIES.Type].getFakes().manyWithId[0]
  })
  fakers[ENTITIES.Profile].makeFakesPack({
    model: fakers[ENTITIES.Model].getFakes().manyWithId[0],
    color: fakers[ENTITIES.Color].getFakes().manyWithId[0],
    size: fakers[ENTITIES.Size].getFakes().manyWithId[0],
    border: fakers[ENTITIES.Border].getFakes().manyWithId[0],
    type: fakers[ENTITIES.Type].getFakes().manyWithId[0]
  })
  // SCHOOLS_ENTITIES
  fakers[ENTITIES.Combo].makeFakesPack({})
  fakers[ENTITIES.Student].makeFakesPack({})
  fakers[ENTITIES.Order].makeFakesPack({
    student: fakers[ENTITIES.Student].getFakes().manyWithId[0],
    prom: fakers[ENTITIES.Prom].getFakes().manyWithId[0],
    quantity: 101
  })
  fakers[ENTITIES.Payment].makeFakesPack({
    order: fakers[ENTITIES.Order].getFakes().manyWithId[0]
  })
  fakers[ENTITIES.ComboOrder].makeFakesPack({
    oneOrder: fakers[ENTITIES.Order].getFakes().manyWithId[0],
    manyOrders: fakers[ENTITIES.Order].getFakes().manyWithId.filter((_, i) => i > 0),
    combo: fakers[ENTITIES.Combo].getFakes().manyWithId[0]
  })
  fakers[ENTITIES.ProductOrder].makeFakesPack({
    order: fakers[ENTITIES.Order].getFakes().manyWithId[0],
    product: fakers[ENTITIES.Product].getFakes().manyWithId[0]
  })
  fakers[ENTITIES.ProductCombo].makeFakesPack({
    product: fakers[ENTITIES.Product].getFakes().manyWithId[0],
    combo: fakers[ENTITIES.Combo].getFakes().manyWithId[0]
  })

  return fakers
}
