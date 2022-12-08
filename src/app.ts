import express, { Request, Response, Router } from 'express'
import cors, { CorsOptions } from 'cors'
import { getRoutes } from './components'
import { Connection as DB } from './core_db/'
import { boomErrorHandler, dbErrorHandler, errorHandler, logErrors } from './middlewares'
import passport from 'passport'
import { JwtStrategy } from './auth'

interface AppParams {
  connection: DB
  port: number | string
  allowedOrigins?: string[]
}

const generateCorsConfig = (allowedOrigins?: string[]): CorsOptions => {
  return {
    origin: (origin: any, callback: CallableFunction) => {
      if (allowedOrigins === undefined) {
        throw new Error('White list empty')
      }
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not Allowed'))
      }
    }
  }
}

export const createApp = (params: AppParams) => {
  const { connection, port, allowedOrigins } = params
  const corsOptions = generateCorsConfig(allowedOrigins)
  const app = express()
  const router = Router()

  app.use(cors(corsOptions))
  passport.use(JwtStrategy)
  app.use(express.json())

  app.get('/', (req: Request, res: Response) => {
    res.send(`It's works ${req.ip}`)
  })

  app.use('/api/v1', router)
  getRoutes(router, connection)

  app.use(logErrors)
  app.use(boomErrorHandler)
  app.use(dbErrorHandler)
  app.use(errorHandler)

  const server = app.listen(port)

  return {
    app,
    server
  }
}
