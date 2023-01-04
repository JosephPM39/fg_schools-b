import { ROLES, getRolesNames } from '../../base'

const gallery = {
  create: getRolesNames([ROLES.root]),
  read: getRolesNames([ROLES.root]),
  update: getRolesNames([ROLES.root]),
  delete: getRolesNames([ROLES.root])
}

const photoProduct = { ...gallery }
const qr = { ...gallery }
const album = { ...gallery }
const galleryAlbum = { ...gallery }

export const entitiesRoles = {
  gallery,
  album,
  galleryAlbum,
  qr,
  photoProduct
}
