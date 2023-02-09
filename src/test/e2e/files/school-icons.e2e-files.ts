import supertest from 'supertest'
import 'reflect-metadata'
import config from '../../../config'
import { EntitiesORM } from '../../../models_school'
import { createApp } from '../../../app'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { Connection } from '../../../core_db'
import { AppDataSource } from '../../../db/data-source'
import { ENV_TEST_CONFIG, MODES } from '../../config'
import path from 'path'
import fs from 'fs'

describe('Test School Icons', () => {
  let app: ReturnType<typeof createApp> | undefined
  let token: string | undefined
  const basePath = '/api/v1/files/school-icon'
  const filesPath = path.join(ENV_TEST_CONFIG.testPath, '/fakers/files')
  let connection: Connection

  beforeAll(async () => {
    if (ENV_TEST_CONFIG.mode === MODES.seeder) {
      console.log('SEEDER MODE')
    }
    const { allowedOrigins } = config
    connection = new Connection(await AppDataSource(EntitiesORM).initialize())
    app = createApp({ connection, port: 3002, allowedOrigins })

    if (!config.jwtSecret) return
    token = jwt.sign({
      sub: uuidv4(),
      role: 'root'
    }, config.jwtSecret)
  })

  test('Upload single JPG', (done) => {
    void supertest(app?.app)
      .post(`${basePath}/upload-single`)
      .set('Authorization', `Bearer ${token ?? ''}`)
      .set('Content-Type', 'multipart/form-data')
      .query({
        filename: 'KEEP_CLIENT_VERSION'
      })
      .attach('file', path.join(filesPath, '/img-test.jpg'))
      .end((_, res) => {
        expect(res.status).toBe(201)
        done()
      })
  }, 10000)

  test('Upload single PNG', (done) => {
    void supertest(app?.app)
      .post(`${basePath}/upload-single`)
      .set('Authorization', `Bearer ${token ?? ''}`)
      .set('Content-Type', 'multipart/form-data')
      .query({
        filename: 'KEEP_CLIENT_VERSION'
      })
      .attach('file', path.join(filesPath, '/img-test.png'))
      .end((_, res) => {
        expect(res.status).toBe(201)
        done()
      })
  }, 10000)

  test('Upload many', (done) => {
    void supertest(app?.app)
      .post(`${basePath}/upload-many`)
      .set('Authorization', `Bearer ${token ?? ''}`)
      .set('Content-Type', 'multipart/form-data')
      .attach('files', path.join(filesPath, '/img-test.jpg'))
      .attach('files', path.join(filesPath, '/img-test.png'))
      .end((_, res) => {
        expect(res.status).toBe(201)
        done()
      })
  }, 40000)

  test('List files', (done) => {
    void supertest(app?.app)
      .get(`${basePath}`)
      .set('Authorization', `Bearer ${token ?? ''}`)
      .end((_, res) => {
        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body.length).toBe(4)
        done()
      })
  })

  test('Download preview error for MP', (done) => {
    void supertest(app?.app)
      .get(`${basePath}/img-test.jpg`)
      .set('Authorization', `Bearer ${token ?? ''}`)
      .end((_, res) => {
        expect(res.status).toBe(503)
        done()
      })
  })

  /* test('Download preview', (done) => {
    void supertest(app?.app)
      .get(`${basePath}/img-test.png`)
      .set('Authorization', `Bearer ${token ?? ''}`)
      .end((_, res) => {
        expect(res.status).toBe(200)
        done()
      })
  }) */

  test('Download', (done) => {
    void supertest(app?.app)
      .get(`${basePath}/download/img-test.jpg`)
      .set('Authorization', `Bearer ${token ?? ''}`)
      .end((_, res) => {
        expect(res.status).toBe(200)
        done()
      })
  })

  test('Delete', (done) => {
    void supertest(app?.app)
      .delete(`${basePath}/img-test.jpg`)
      .set('Authorization', `Bearer ${token ?? ''}`)
      .end((_, res) => {
        expect(res.status).toBe(200)
        done()
      })
  })

  afterAll(async () => {
    await connection?.quit()
    app?.server?.close()
    fs.rm(path.join(config.appStorageDir, '/files'), { recursive: true, force: true }, (err) => {
      if (err) console.error(err)
    })
  })
})
