const faker = require('faker')
const { factory } = require('factory-girl')
const { User } = require('../../src/models')

factory.define('User', User, {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  title: faker.name.findName()
})

module.exports = factory
