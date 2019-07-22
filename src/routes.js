const routes = require('express').Router()

const asyncWrap = require('./utils/async-wrap')

const UserController = require('./controllers/UserController')
const UserValidator = require('./validators/UserValidator')

routes
  .route('/users')
  .get(UserController.index)
  .post(UserValidator.store(), asyncWrap(UserController.store))

routes
  .route('/users/:id')
  .get(asyncWrap(UserController.show))
  .put(UserValidator.update(), asyncWrap(UserController.update))
  .delete(asyncWrap(UserController.destroy))

module.exports = routes
