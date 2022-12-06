import { ROLES, getRolesNames } from '../../base'

const schoolRoles = {
  create: getRolesNames([ROLES.root]),
  read: getRolesNames([ROLES.root]),
  update: getRolesNames([ROLES.root]),
  delete: getRolesNames([ROLES.root])
}

const groupRoles = { ...schoolRoles }

export const entitiesRoles = {
  school: schoolRoles,
  group: groupRoles
}
