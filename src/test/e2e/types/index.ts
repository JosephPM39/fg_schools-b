import { Express } from 'express'
import { Server } from 'http'
import { DB } from '../../../db'

export interface TestMutableParams {
  app?: Express
  server?: Server
  connection?: DB
  auth?: {
    token?: string
  }
}
