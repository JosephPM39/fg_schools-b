import { DB } from '../../'
import { BaseController, endpointsCrud } from '../../base/'
import { Router } from 'express'
import { School } from '../models/school.model'
import { Group } from '../models/group.model'

export const SchoolsRoutes = (connection: DB) => {
  const router = Router()

  const SchoolRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, School)
  })

  const GroupRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Group)
  })

  router.use('/school', SchoolRoutes)
  router.use('/group', GroupRoutes)

  return router
}
