import path from 'path'

export const ENV_TEST_CONFIG = {
  mode: process.env.MODE ?? 'TEST',
  testPath: path.join(__dirname, '../')
}

export enum MODES {
  seeder = 'SEEDER',
  test = 'TEST'
}
