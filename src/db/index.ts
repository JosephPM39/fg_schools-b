import { Connection } from './connection-orm'
import { AppDataSource, EntitiesADS } from './data-source'

export { Connection as DB } from './connection-orm'

export const createDBConnection = async (EntitiesORM: EntitiesADS) => {
  const obj = new Connection(AppDataSource(EntitiesORM))
  await obj.init()
  return obj
}
