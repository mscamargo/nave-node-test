require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || '127.0.0.1',

  APP_URL: process.env.APP_URL,

  SECRET_KEY: process.env.SECRET_KEY || '',

  DB_DIALECT: process.env.DB_DIALECT || 'postgress',
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_PORT: process.env.DB_PORT || '5432',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASS: process.env.DB_PASS || '',
  DB_NAME: process.env.DB_NAME || '',

  IS_DEV: process.env.NODE_ENV !== 'production'
}
