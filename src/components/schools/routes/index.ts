import { DB } from '../../'
import { BaseController, endpointsCrud } from '../../base/'
import { Router } from 'express'
import { School, ISchoolCreate, ISchoolUpdate, ISchoolGet } from '../models/school.model'

export const SchoolsRoutes = (connection: DB) => {
  const router = Router()

  const SchoolRoutes = endpointsCrud<School, ISchoolCreate, ISchoolGet['id'], ISchoolGet, ISchoolUpdate>({
    router: Router(),
    controller: new BaseController(connection, School)
  })

  router.use('/school', SchoolRoutes)

  return router
}
