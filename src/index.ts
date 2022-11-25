import * as dotenv from 'dotenv'
import express, { Request, Response, Router } from 'express'
import cors, { CorsOptions } from 'cors'
import 'reflect-metadata'
import config from './config'
import { getRoutes, EntitiesORM } from './components'
import { DB } from './db'
dotenv.config()

const createApp = async () => {
  console.log(process.env)
  const connection = new DB(EntitiesORM)
  await connection.init()

  const app = express()
  const port = config.apiPort
  const whiteList = config.allowedOrigins
  const corsOptions: CorsOptions = {
    origin: (origin: any, callback: CallableFunction) => {
      if (whiteList === undefined) {
        throw new Error('White list empty')
      }
      if (whiteList.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not found'))
      }
    }
  }

  app.use(cors(corsOptions))
  app.use(express.json())

  app.get('/', (req: Request, res: Response) => {
    res.send(`It's works ${req.ip}`)
  })

  const router = Router()

  app.use('/api/v1', router)

  getRoutes(router, connection)

  app.listen(port)
}

createApp()
