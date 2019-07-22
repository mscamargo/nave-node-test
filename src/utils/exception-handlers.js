const { ValidationError } = require('express-validation')

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
  }
}
