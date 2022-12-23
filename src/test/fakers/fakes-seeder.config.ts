import { ENTITIES, Fakers } from './types'

export const configForSeeder = (fakers: Fakers) => {
  configSchool(fakers)
  configProduct(fakers)
  configStore(fakers)
  configPhoto(fakers)
}

export const configSchool = (fakers: Fakers) => {
  // SCHOOLS_ENTITIES
  fakers[ENTITIES.Group].makeFakesPack({})
  fakers[ENTITIES.Position].makeFakesPack({})
  fakers[ENTITIES.Employee].makeFakesPack({})
  fakers[ENTITIES.School].makeFakesPack({})
  fakers[ENTITIES.Title].makeFakesPack({})

  for (let i = 0; i < 2; i++) {
    fakers[ENTITIES.EmployeePosition].makeFakesPackWithManyD({
      employee: fakers[ENTITIES.Employee].getFakes().manyWithId,
      position: fakers[ENTITIES.Position].getFakes().manyWithId
    })
  }

  fakers[ENTITIES.Prom].makeFakesPackWithManyD({
    group: fakers[ENTITIES.Group].getFakes().manyWithId,
    title: fakers[ENTITIES.Title].getFakes().manyWithId,
    profesor: fakers[ENTITIES.EmployeePosition].getFakes().manyWithId.filter((_, i) => i < 100),
    principal: fakers[ENTITIES.EmployeePosition].getFakes().manyWithId.filter((_, i) => i > 99),
    school: fakers[ENTITIES.School].getFakes().manyWithId,
    year: fakers[ENTITIES.School].getFakes().manyWithId.map(() => ({ n: 2022 }))
  })
}

export const configProduct = (fakers: Fakers) => {
  // PRODUCTS_ENTITIES
  fakers[ENTITIES.Border].makeFakesPack({})
  fakers[ENTITIES.Color].makeFakesPack({})
  fakers[ENTITIES.Model].makeFakesPack({})
  fakers[ENTITIES.Size].makeFakesPack({})
  fakers[ENTITIES.Type].makeFakesPack({})
  fakers[ENTITIES.Product].makeFakesPackWithManyD({
    model: fakers[ENTITIES.Model].getFakes().manyWithId,
    color: fakers[ENTITIES.Color].getFakes().manyWithId,
    size: fakers[ENTITIES.Size].getFakes().manyWithId,
    border: fakers[ENTITIES.Border].getFakes().manyWithId,
    type: fakers[ENTITIES.Type].getFakes().manyWithId
  })
  fakers[ENTITIES.Profile].makeFakesPackWithManyD({
    model: fakers[ENTITIES.Model].getFakes().manyWithId,
    color: fakers[ENTITIES.Color].getFakes().manyWithId,
    size: fakers[ENTITIES.Size].getFakes().manyWithId,
    border: fakers[ENTITIES.Border].getFakes().manyWithId,
    type: fakers[ENTITIES.Type].getFakes().manyWithId
  })
}

export const configStore = (fakers: Fakers) => {
  // STORE_ENTITIES
  fakers[ENTITIES.Combo].makeFakesPack({})
  fakers[ENTITIES.Student].makeFakesPack({})

  for (let i = 0; i < 2; i++) {
    fakers[ENTITIES.Order].makeFakesPackWithManyD({
      student: fakers[ENTITIES.Student].getFakes().manyWithId,
      prom: fakers[ENTITIES.Prom].getFakes().manyWithId
    })
  }

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
}

export const configPhoto = (fakers: Fakers) => {
  // PHOTOS_ENTITIES
  fakers[ENTITIES.Photo].makeFakesPack({
    oneOrder: fakers[ENTITIES.Order].getFakes().manyWithId[0],
    manyOrders: fakers[ENTITIES.Order].getFakes().manyWithId.filter((_, i) => i > 0),
    oneProm: fakers[ENTITIES.Prom].getFakes().manyWithId[0],
    manyProms: fakers[ENTITIES.Prom].getFakes().manyWithId.filter((_, i) => i > 0),
    quantity: 98
  })

  fakers[ENTITIES.Qr].makeFakesPack({
    onePhoto: fakers[ENTITIES.Photo].getFakes().manyWithId[0],
    manyPhotos: fakers[ENTITIES.Photo].getFakes().manyWithId.filter((_, i) => i > 0),
    quantity: 97
  })
  fakers[ENTITIES.PhotoProduct].makeFakesPack({
    photo: fakers[ENTITIES.Photo].getFakes().manyWithId[0],
    product: fakers[ENTITIES.Product].getFakes().manyWithId[0],
    quantity: 97
  })
}
