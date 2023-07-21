import 'reflect-metadata'
import config from './config'
import { EntitiesORM } from './models_school'
import { createApp } from './app'
import { Connection } from './core_db'
import { AppDataSource } from './db/data-source'

const init = async () => {
  console.info('CONNECTING TO DB...')
  const connection = new Connection(await AppDataSource(EntitiesORM).initialize())
  if (config.dbSync === 'true') {
    console.info('SYNCING DB...')
    await connection.syncDB('confirm')
  }
  console.info('CREATING APP...')
  const { apiPort: port, allowedOrigins } = config
  createApp({ connection, port, allowedOrigins })
  console.info('READY')
}

void init()
