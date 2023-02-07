import { ROLES, getRolesNames } from '../../base'

export const filesRoles = {
  upload: getRolesNames([ROLES.root]),
  download: getRolesNames([ROLES.root]),
  preview: getRolesNames([ROLES.root]),
  update: getRolesNames([ROLES.root]),
  delete: getRolesNames([ROLES.root])
}
