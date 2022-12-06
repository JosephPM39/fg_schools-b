import { endpointsCrud } from '../../base/'
import { Router } from 'express'
import { School } from '../models/school.model'
import { Group } from '../models/group.model'
import { entitiesRoles } from '../auth'
import { BaseController, Connection as DB } from '../../../core_db'

export const SchoolsRoutes = (connection: DB) => {
  const router = Router()

  const SchoolRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, School),
    rolesForEndpoints: entitiesRoles.school
  })

  const GroupRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Group),
    rolesForEndpoints: entitiesRoles.group
  })

  router.use('/school', SchoolRoutes)
  router.use('/group', GroupRoutes)

  return router
}
