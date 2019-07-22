const NotFoundError = require('./NotFoundError')

class UserNotFoundError extends NotFoundError {
  constructor (message = 'User not found') {
    super(message)
  }
}

module.exports = UserNotFoundError
