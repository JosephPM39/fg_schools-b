import config from '../config/'
import { DataSource, EntitySchema, MixedList } from 'typeorm'

export type EntitiesADS = MixedList<string | Function | EntitySchema<any>>

export const AppDataSource = (EntitiesORM?: EntitiesADS, synchronize?: boolean): DataSource => new DataSource({
  type: 'postgres',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUser,
  password: config.dbPass,
  database: config.dbName,
  entities: EntitiesORM,
  synchronize,
  logging: config.env === 'dev'
})
