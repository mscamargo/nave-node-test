const routes = require('express').Router()

const asyncWrap = require('./utils/async-wrap')

const UserValidator = require('./validators/UserValidator')
const PostValidator = require('./validators/PostValidator')

const UserController = require('./controllers/UserController')
const AuthenticationController = require('./controllers/AuthenticationController')
const PostController = require('./controllers/PostController')

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

routes
  .route('/posts')
  .get(asyncWrap(PostController.index))
  .post(PostValidator.store(), asyncWrap(PostController.store))

routes
  .route('/posts/:id')
  .get(asyncWrap(PostController.show))
  .put(PostValidator.update(), asyncWrap(PostController.update))
  .delete(asyncWrap(PostController.destroy))

module.exports = routes
