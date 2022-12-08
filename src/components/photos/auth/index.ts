import { ROLES, getRolesNames } from '../../base'

const photo = {
  create: getRolesNames([ROLES.root]),
  read: getRolesNames([ROLES.root]),
  update: getRolesNames([ROLES.root]),
  delete: getRolesNames([ROLES.root])
}

const photoProduct = { ...photo }
const qr = { ...photo }

export const entitiesRoles = {
  photo,
  qr,
  photoProduct
}
