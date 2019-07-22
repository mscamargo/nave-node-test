const routes = require('express').Router()

const asyncWrap = require('./utils/async-wrap')

const UserController = require('./controllers/UserController')
const AuthenticationController = require('./controllers/AuthenticationController')
const UserValidator = require('./validators/UserValidator')

const authMiddleware = require('./middlewares/auth')

routes.post('/login', asyncWrap(AuthenticationController.store))

routes
  .route('/users')
  .get(authMiddleware, UserController.index)
  .post(UserValidator.store(), asyncWrap(UserController.store))

routes.use(authMiddleware)
routes
  .route('/users/:id')
  .get(asyncWrap(UserController.show))
  .put(UserValidator.update(), asyncWrap(UserController.update))
  .delete(asyncWrap(UserController.destroy))

module.exports = routes
