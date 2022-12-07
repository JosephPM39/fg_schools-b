import { ROLES, getRolesNames } from '../../base'

const school = {
  create: getRolesNames([ROLES.root]),
  read: getRolesNames([ROLES.root]),
  update: getRolesNames([ROLES.root]),
  delete: getRolesNames([ROLES.root])
}

const group = { ...school }
const employee = { ...school }
const title = { ...school }
const employeePosition = { ...school }
const position = { ...school }
const prom = { ...school }

export const entitiesRoles = {
  school,
  group,
  employee,
  title,
  employeePosition,
  position,
  prom
}
