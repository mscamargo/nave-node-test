const routes = require('express').Router()

const asyncWrap = require('./utils/async-wrap')

const authMiddleware = require('./middlewares/auth')

const UserValidator = require('./validators/UserValidator')
const PostValidator = require('./validators/PostValidator')
const CommentValidator = require('./validators/CommentValidator')

const AuthenticationController = require('./controllers/AuthenticationController')
const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')
const CommentController = require('./controllers/CommentController')

/**
 * Public routes
 */
routes.post('/login', asyncWrap(AuthenticationController.store))
routes.post('/users', UserValidator.store(), asyncWrap(UserController.store))

/**
 * Private routes
 */
routes.use(authMiddleware)

// Users
routes.get('/users', asyncWrap(UserController.index))
routes.get('/users/:id', asyncWrap(UserController.show))
routes.put('/users/:id', UserValidator.update(), asyncWrap(UserController.update))
routes.delete('/users/:id', UserValidator.delete(), asyncWrap(UserController.destroy))

// Posts
routes.get('/posts', asyncWrap(PostController.index))
routes.post('/posts', PostValidator.store(), asyncWrap(PostController.store))

routes.get('/posts/:id', asyncWrap(PostController.show))
routes.put('/posts/:id', PostValidator.update(), asyncWrap(PostController.update))
routes.delete('/posts/:id', PostValidator.delete(), asyncWrap(PostController.destroy))

// Comments
routes.get('/posts/:post_id/comments', asyncWrap(CommentController.index))
routes.post('/posts/:post_id/comments', CommentValidator.store(), asyncWrap(CommentController.store))

routes.put('/posts/:post_id/comments/:id', CommentValidator.update(), asyncWrap(CommentController.update))
routes.delete('/posts/:post_id/comments/:id', CommentValidator.delete(), asyncWrap(CommentController.destroy))

module.exports = routes
