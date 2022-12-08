import { endpointsCrud } from '../../../core_api'
import { Router } from 'express'
import { entitiesRoles } from '../auth'
import { BaseController, Connection as DB } from '../../../core_db'
import { ProductOrder, ComboOrder, ProductCombo, Student, Payment, Order, Combo } from '../../../models_school'

export const StoreRoutes = (connection: DB) => {
  const router = Router()

  const OrderRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Order),
    rolesForEndpoints: entitiesRoles.order
  })

  const ComboRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Combo),
    rolesForEndpoints: entitiesRoles.combo
  })

  const ProductOrderRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, ProductOrder),
    rolesForEndpoints: entitiesRoles.productOrder
  })

  const ComboOrderRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, ComboOrder),
    rolesForEndpoints: entitiesRoles.comboOrder
  })

  const ProductComboRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, ProductCombo),
    rolesForEndpoints: entitiesRoles.productCombo
  })

  const PaymentRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Payment),
    rolesForEndpoints: entitiesRoles.payment
  })

  const StudentRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Student),
    rolesForEndpoints: entitiesRoles.student
  })

  router.use('/order', OrderRoutes)
  router.use('/combo', ComboRoutes)
  router.use('/combo-order', ComboOrderRoutes)
  router.use('/product-order', ProductOrderRoutes)
  router.use('/product-combo', ProductComboRoutes)
  router.use('/payment', PaymentRoutes)
  router.use('/student', StudentRoutes)

  return router
}
