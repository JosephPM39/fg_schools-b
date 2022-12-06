import { Express } from 'express'
import { Server } from 'http'
import { Connection as DB } from '../../../core_db/'

export interface TestMutableParams {
  app?: Express
  server?: Server
  connection?: DB
  auth?: {
    token?: string
  }
}
