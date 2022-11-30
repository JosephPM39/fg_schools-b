import 'reflect-metadata'
import config from '../../config'
import { EntitiesORM } from '../../components'
import { createDBConnection, DB } from '../../db'
import { createApp } from '../../app'
import { Server } from 'http'
import { Express } from 'express'
import supertest from 'supertest'
import { generateOneFake } from '../fakes/schools'

describe('Test Schools Component Endpoints', () => {
  let app: Express
  let server: Server
  let connection: DB
  const componentPath = '/api/v1/schools/'

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

  describe('Test for school', () => {
    const basePath = componentPath + 'school/'

    describe('Test for [POST]', () => {
      const fake = generateOneFake()
      test('Post one DTO', async () => await supertest(app)
        .post(basePath)
        .send(fake)
        .expect('Content-Type', /json/)
        // .expect((res: any) => res.body.details.map((c: any) => console.log(c, 'error')))
        .expect(201)
        .then((res) => {
          expect(res.body).toBeTruthy()
        })
      )
    })

    describe('Test for [GET]', () => {
      test('should return "10 elements"', async () => await supertest(app)
        .get(basePath)
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBeGreaterThan(0)
        })
      )
    })
  })
})
