import { ROLES, getRolesNames } from '../../base'

const model = {
  create: getRolesNames([ROLES.root]),
  read: getRolesNames([ROLES.root]),
  update: getRolesNames([ROLES.root]),
  delete: getRolesNames([ROLES.root])
}

const type = { ...model }
const product = { ...model }
const profile = { ...model }
const size = { ...model }
const border = { ...model }
const color = { ...model }

export const entitiesRoles = {
  model,
  type,
  product,
  profile,
  size,
  border,
  color
}
