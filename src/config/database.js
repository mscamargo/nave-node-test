const env = require('./env')

module.exports = {
  url: env.DATABASE_URL,
  dialect: env.DB_DIALECT,
  storage: env.DB_STORAGE, // if the dialect is sqlite
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  operatorAliases: false,
  logging: env.IS_TEST ? false : console.log,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
