const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config/env')

module.exports = {
  generate: user => jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 }),
  verify: token => {
    try {
      return !!jwt.verify(token, SECRET_KEY)
    } catch (e) {
      return false
    }
  },
  decode: token => jwt.decode(token)
}
