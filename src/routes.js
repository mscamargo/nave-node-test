const routes = require('express').Router()

routes.get('/', (_, res) => res.json({ message: 'Hello world' }))

module.exports = routes
