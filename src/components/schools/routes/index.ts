import { endpointsCrud } from '../../../core_api'
import { Router } from 'express'
import { entitiesRoles } from '../auth'
import { BaseController, Connection as DB } from '../../../core_db'
import { Employee, EmployeePosition, Position, Title, School, Group, SchoolProm, SectionProm } from '../../../models_school'

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

  const EmployeeRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Employee),
    rolesForEndpoints: entitiesRoles.employee
  })

  const EmployeePositionRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, EmployeePosition),
    rolesForEndpoints: entitiesRoles.employeePosition
  })

  const PositionRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Position),
    rolesForEndpoints: entitiesRoles.position
  })

  const TitleRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, Title),
    rolesForEndpoints: entitiesRoles.title
  })

  const SchoolPromRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, SchoolProm),
    rolesForEndpoints: entitiesRoles.schoolProm
  })

  const SectionPromRoutes = endpointsCrud({
    router: Router(),
    controller: new BaseController(connection, SectionProm),
    rolesForEndpoints: entitiesRoles.sectionProm
  })

  router.use('/school', SchoolRoutes)
  router.use('/group', GroupRoutes)
  router.use('/employee', EmployeeRoutes)
  router.use('/employee-position', EmployeePositionRoutes)
  router.use('/position', PositionRoutes)
  router.use('/title', TitleRoutes)
  router.use('/school-prom', SchoolPromRoutes)
  router.use('/section-prom', SectionPromRoutes)

  return router
}
