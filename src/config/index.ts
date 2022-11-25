import * as dotenv from 'dotenv'
dotenv.config()

const config = {
  env: process.env.NODE_ENV,
  apiPort: process.env.API_PORT ?? 3000,
  appVersion: process.env.npm_package_version ?? '0.0.1',

  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER ?? '',
  dbPass: process.env.DB_PASS ?? '',
  dbPort: (process.env.DB_PORT !== undefined)
    ? parseInt(process.env.DB_PORT, 10)
    : undefined,
  dbHost: process.env.DB_HOST,
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(' ')
}

export default config
