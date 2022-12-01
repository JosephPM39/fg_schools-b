import 'reflect-metadata'
import config from '../../config'
import { EntitiesORM } from '../../components'
import { createDBConnection } from '../../db'
import { createApp } from '../../app'
import { testSchoolComponent } from './schools'
import { TestMutableParams } from './types'

describe('Full e2e App Testing', () => {
  const mutableParams: TestMutableParams = {}
  const path = '/api/v1/'

  beforeAll(async () => {
    mutableParams.connection = await createDBConnection(EntitiesORM)
    await mutableParams.connection.syncDB('confirm')
    const { allowedOrigins } = config
    const createdApp = createApp({ connection: mutableParams.connection, port: 3001, allowedOrigins })
    mutableParams.app = createdApp.app
    mutableParams.server = createdApp.server
  })

  afterAll(async () => {
    // await mutableParams.connection?.dropDB('confirm')
    await mutableParams.connection?.quit()
    mutableParams.server?.close()
  })
  testSchoolComponent(mutableParams, path)
})
