import 'reflect-metadata'
import config from '../../config'
import { EntitiesORM } from '../../models_school'
import { createApp } from '../../app'
import { testSchoolComponent } from './schools'
import { TestMutableParams } from './types'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { Connection } from '../../core_db'
import { AppDataSource } from '../../db/data-source'
import { testProductComponent } from './products'
import { testStoreComponent } from './store'
import { GetApiFakers } from '../fakers'
import { testPhotoComponent } from './photos'

describe('Full e2e App Testing', () => {
  const mutableParams: TestMutableParams = {
    basePath: '/api/v1'
  }

  mutableParams.fakers = GetApiFakers()

  beforeAll(async () => {
    mutableParams.connection = new Connection(await AppDataSource(EntitiesORM).initialize())
    await mutableParams.connection.syncDB('confirm')

    const { allowedOrigins } = config
    const createdApp = createApp({ connection: mutableParams.connection, port: 3001, allowedOrigins })

    mutableParams.app = createdApp.app
    mutableParams.server = createdApp.server

    if (!config.jwtSecret) return
    const token = jwt.sign({
      sub: uuidv4(),
      role: 'root'
    }, config.jwtSecret)
    mutableParams.auth = {
      token
    }
  })

  afterAll(async () => {
    await mutableParams.connection?.dropDB('confirm')
    await mutableParams.connection?.quit()
    mutableParams.server?.close()
  })
  testSchoolComponent(mutableParams)
  testProductComponent(mutableParams)
  testStoreComponent(mutableParams)
  testPhotoComponent(mutableParams)
})
