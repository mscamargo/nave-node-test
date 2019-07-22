const UnauthorizedError = require('../exceptions/UnauthorizedError')
const jwt = require('../utils/jwt')

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new UnauthorizedError('Token not provided')
  }

  const [, token] = authHeader.split(' ')

  if (!jwt.verify(token)) {
    throw new UnauthorizedError('Ivalid or expired token')
  }

  request.auth = { user: { id: jwt.decode(token).id } }

  return next()
}
