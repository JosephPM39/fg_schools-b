import 'reflect-metadata'
import config from './config'
import { EntitiesORM } from './components'
import { createApp } from './app'
import { Connection } from './core_db'
import { AppDataSource } from './db/data-source'

const init = async () => {
  const connection = new Connection(await AppDataSource(EntitiesORM).initialize())
  if (config.dbSync === 'true') {
    await connection.syncDB('confirm')
  }
  const { apiPort: port, allowedOrigins } = config
  createApp({ connection, port, allowedOrigins })
}

void init()
