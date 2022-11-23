const config = {
  env: process.env.NODE_ENV,
  apiPort: process.env.API_PORT ?? 3000,
  appVersion: process.env.npm_package_version ?? '0.0.1',

  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER ?? '',
  dbPass: process.env.DB_PASS ?? '',
  dbPort: process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : undefined,
  dbHost: process.env.DB_HOST,
};

export default { ...config };
