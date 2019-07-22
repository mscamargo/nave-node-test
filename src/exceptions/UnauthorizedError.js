const ApplicationError = require('./ApplicationError')

class UnauthorizedError extends ApplicationError {
  constructor (message = 'Invalid credentials') {
    super(message, 401)
  }
}

module.exports = UnauthorizedError
