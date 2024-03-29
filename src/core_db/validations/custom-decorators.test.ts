import 'reflect-metadata'
import { validateQuery } from '.'
import { Order, Query } from './query'

const helper = async (query: Partial<Query>) => {
  try {
    return await validateQuery(query)
  } catch (er: any) {
    return er.output.payload
  }
}

describe('Test customs decorators', () => {
  test('Test isIntOrIn', async () => {
    const query = new Query()
    query.limit = 'NONE'
    query.order = Order.desc
    query.offset = 2

    expect(await helper(query)).toMatchObject({ limit: 'NONE' })
    query.limit = 10
    expect(await helper(query)).toMatchObject({ limit: 10 })
  })

  test('Test with object to isIntOrIn', async () => {
    const query: any = {
      limit: 'NONE',
      order: 'DESC',
      offset: 2
    }

    expect(await helper(query)).toMatchObject({ limit: 'NONE' })

    query.limit = '10'
    expect(await helper(query)).toMatchObject({ limit: '10' })

    query.limit = 'z...{{z0a'
    expect(await helper(query)).not.toMatchObject({ limit: 'z...{{z0a' })
  })
})
