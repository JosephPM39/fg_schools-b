import config from '../config/'
import { BaseEntity, DataSource, EntitySchema, EntityTarget, MixedList } from 'typeorm';

export type EntitiesADS = MixedList<string | Function | EntitySchema<any>>;

export const AppDataSource = (EntitiesORM?: EntitiesADS) => new DataSource({
  type: 'postgres',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUser,
  password: config.dbPass,
  database: config.dbName,
  entities: EntitiesORM,
  synchronize: true,
  logging: config.env === 'dev',
});
