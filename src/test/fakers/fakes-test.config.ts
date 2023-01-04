import { ENTITIES, Fakers } from './types'

export const configForTest = (fakers: Fakers) => {
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
  fakers[ENTITIES.EmployeePosition].makeFakesPack({
    employee: fakers[ENTITIES.Employee].getFakes().manyWithId[0],
    position: fakers[ENTITIES.Position].getFakes().manyWithId[0]
  })
  fakers[ENTITIES.SchoolProm].makeFakesPack({
    principal: fakers[ENTITIES.EmployeePosition].getFakes().manyWithId[1],
    school: fakers[ENTITIES.School].getFakes().manyWithId[0],
    quantity: 102
  })
  fakers[ENTITIES.SectionProm].makeFakesPack({
    group: fakers[ENTITIES.Group].getFakes().manyWithId[0],
    title: fakers[ENTITIES.Title].getFakes().manyWithId[0],
    profesor: fakers[ENTITIES.EmployeePosition].getFakes().manyWithId[0],
    schoolProm: fakers[ENTITIES.SchoolProm].getFakes().manyWithId[0],
    quantity: 102
  })
}

export const configProduct = (fakers: Fakers) => {
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
}

export const configStore = (fakers: Fakers) => {
  // STORE_ENTITIES
  fakers[ENTITIES.Combo].makeFakesPack({})
  fakers[ENTITIES.Student].makeFakesPack({})
  fakers[ENTITIES.Order].makeFakesPack({
    student: fakers[ENTITIES.Student].getFakes().manyWithId[0],
    sectionProm: fakers[ENTITIES.SectionProm].getFakes().manyWithId[0],
    quantity: 102
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
}

export const configPhoto = (fakers: Fakers) => {
  // PHOTOS_ENTITIES
  fakers[ENTITIES.Gallery].makeFakesPackWithManyD({
    order: fakers[ENTITIES.Order].getFakes().manyWithId.filter((_, i) => i > 0),
    sectionProm: fakers[ENTITIES.SectionProm].getFakes().manyWithId.filter((_, i) => i > 0)
  }, {
    order: fakers[ENTITIES.Order].getFakes().manyWithId[0],
    sectionProm: fakers[ENTITIES.SectionProm].getFakes().manyWithId[0]
  })
  fakers[ENTITIES.Album].makeFakesPack({})
  fakers[ENTITIES.GalleryAlbum].makeFakesPack({
    gallery: fakers[ENTITIES.Gallery].getFakes().manyWithId[0],
    album: fakers[ENTITIES.Album].getFakes().manyWithId[0]
  })
  fakers[ENTITIES.Qr].makeFakesPackWithManyD({
    gallery: fakers[ENTITIES.Gallery].getFakes().manyWithId.filter((_, i) => i > 0)
  }, {
    gallery: fakers[ENTITIES.Gallery].getFakes().manyWithId[0]
  })
  fakers[ENTITIES.PhotoProduct].makeFakesPack({
    album: fakers[ENTITIES.Album].getFakes().manyWithId[0],
    product: fakers[ENTITIES.Product].getFakes().manyWithId[0]
  })
}
