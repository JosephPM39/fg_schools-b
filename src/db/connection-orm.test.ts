import 'reflect-metadata'
import { Connection } from '../core_db'
import config from '../config'
import { EntitiesORM } from '../models_school'
import { AppDataSource } from './data-source'

if (config.env !== 'test') {
  throw Error(`Current env isn't test, current env: ${config.env ?? ''}`)
}

describe('ORM', () => {
  let con: Connection
  beforeAll(async () => {
    con = new Connection(AppDataSource(EntitiesORM))
    await con.init()
  })
  test('Test ORM connection to DB, to return now number day of week', async () => {
    const res = await con.rawQuery('SELECT NOW()').then((res) => res[0])
    expect(res.now).not.toBeNull()
    expect(res.now).not.toBeUndefined()
    const date = new Date(res.now)
    expect(date.getDay()).toEqual(new Date().getDay())
  })
  afterAll(async () => {
    await con.quit()
  })
})
