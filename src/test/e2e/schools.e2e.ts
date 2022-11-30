import 'reflect-metadata'
import config from '../../config'
import { EntitiesORM } from '../../components'
import { createDBConnection, DB } from '../../db'
import { createApp } from '../../app'
import { Server } from 'http'
import { Express } from 'express'
import supertest from 'supertest'

describe('Test Schools Endpoints', () => {
  let app: Express
  let server: Server
  let connection: DB

  beforeAll(async () => {
    connection = await createDBConnection(EntitiesORM)
    const { allowedOrigins } = config
    const createdApp = createApp({ connection, port: 3001, allowedOrigins })
    app = createdApp.app
    server = createdApp.server
  })

  afterAll(async () => {
    await connection.quit()
    await server.close()
  })

  describe('Test for school component', () => {
    describe('Test for [GET]', () => {
      test('should return "[]"', async () => await supertest(app)
        .get('/api/v1/schools/school/')
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual([])
        })
      )
    })
  })
})
