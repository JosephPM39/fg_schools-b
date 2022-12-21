import { Express } from 'express'
import { Server } from 'http'
import { Connection as DB } from '../../../core_db/'
import { Fakers } from '../../fakers/types'
export { ENTITIES } from '../../fakers/types'

export enum COMPONENTS {
  Schools = 'schools',
  Products = 'products',
  Store = 'store'
}

export interface TestMutableParams {
  app?: Express
  server?: Server
  connection?: DB
  fakers?: Fakers
  basePath?: string
  auth?: {
    token?: string
  }
}
