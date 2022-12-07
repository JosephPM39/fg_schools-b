interface Role {
  name: string
  enable: boolean
}

export const ROLES = {
  root: {
    name: 'root',
    enable: true
  },
  admin: {
    name: 'admin',
    enable: true
  }
}

const filterActive = (roles: Role[]) => {
  return roles.filter((role) => role.enable)
}

const getNames = (roles: Role[]) => {
  return roles.map((role) => role.name)
}

export const getRolesNames = (roles: Role[], onlyEnable = true) => {
  if (!onlyEnable) return getNames(roles)
  return getNames(filterActive(roles))
}
