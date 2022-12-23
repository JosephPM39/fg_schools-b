export const ENV_TEST_CONFIG = {
  mode: process.env.MODE ?? 'TEST'
}

export enum MODES {
  seeder = 'SEEDER',
  test = 'TEST'
}
