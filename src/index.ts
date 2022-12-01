import 'reflect-metadata'
import config from './config'
import { EntitiesORM } from './components'
import { createDBConnection } from './db'
import { createApp } from './app'

const init = async () => {
  const connection = await createDBConnection(EntitiesORM)
  if (config.dbSync) {
    await connection.syncDB('confirm')
  }
  const { apiPort: port, allowedOrigins } = config
  createApp({ connection, port, allowedOrigins })
}

void init()
