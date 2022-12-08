import { Router } from 'express'
import { SchoolsRoutes } from './schools/routes'
import { Connection as DB } from './../core_db'
import { ProductsRoutes } from './products/routes'
import { StoreRoutes } from './store/routes'

export const getRoutes = (router: Router, connection: DB) => {
  router.use('/schools', SchoolsRoutes(connection))
  router.use('/products', ProductsRoutes(connection))
  router.use('/store', StoreRoutes(connection))
}
