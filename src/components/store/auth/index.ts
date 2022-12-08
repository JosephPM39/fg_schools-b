import { ROLES, getRolesNames } from '../../base'

const order = {
  create: getRolesNames([ROLES.root]),
  read: getRolesNames([ROLES.root]),
  update: getRolesNames([ROLES.root]),
  delete: getRolesNames([ROLES.root])
}

const combo = { ...order }
const student = { ...order }
const payment = { ...order }
const productCombo = { ...order }
const productOrder = { ...order }
const comboOrder = { ...order }

export const entitiesRoles = {
  order,
  student,
  payment,
  productCombo,
  productOrder,
  comboOrder,
  combo
}
