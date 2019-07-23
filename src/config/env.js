require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3000,

  SECRET_KEY: process.env.SECRET_KEY || 'nave_node_test',

  DB_DIALECT: process.env.DB_DIALECT || 'sqlite',
  DB_STORAGE: process.env.DB_STORAGE || 'database.sqlite',
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,

  IS_DEV: process.env.NODE_ENV !== 'production'
}
