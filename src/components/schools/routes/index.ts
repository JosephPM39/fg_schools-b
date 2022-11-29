import { DB } from '../../'
import { BaseController, endpointsCrud } from '../../base/'
import { Router } from 'express'
import { School } from '../models/school.model'

export const SchoolsRoutes = (connection: DB) => {
  const router = Router()

  const SchoolRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, School)
  })

  router.use('/school', SchoolRoutes)

  return router
}
