const { ValidationError } = require('express-validation')
const env = require('../config/env')
const ApplicationError = require('../exceptions/ApplicationError')

module.exports = {
  sequelizeValidationErrorHandler: (error, request, response, next) => {
    if (
      error.name !== 'SequelizeValidationError' &&
      error.name !== 'SequelizeUniqueConstraintError'
    ) {
      return next(error)
    }

    const errors = error.errors.map(({ message, path }) => ({
      messages: [message],
      field: path
    }))

    return response.status(400).json({ errors })
  },

  schemaValidationErrorHandler: (error, request, response, next) => {
    if (!(error instanceof ValidationError)) {
      return next(error)
    }

    const errors = error.errors.map(({ messages, field }) => ({
      messages,
      field: field[0]
    }))

    return response.status(error.status).json({ errors })
  },

  applicationErrors: (error, request, response, next) => {
    if (!(error instanceof ApplicationError)) {
      return next()
    }

    const { status, message, stack } = error

    if (env.IS_DEV) {
      console.log(stack)
    }

    return response.status(status).json({ message })
  }
}
