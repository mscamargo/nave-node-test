const ApplicationError = require('./ApplicationError')

class ForbiddenError extends ApplicationError {
  constructor (message = 'Not allowed') {
    super(message, 403)
  }
}

module.exports = ForbiddenError
