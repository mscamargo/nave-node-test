const bcrypt = require('bcryptjs')

const truncateTables = require('../utils/truncate-tables')
const factory = require('../utils/factories')

describe('User Model', () => {
  beforeEach(async () => {
    await truncateTables()
  })

  test('should encrypt user password before save', async () => {
    const password = '123456'
    const user = await factory.create('User', { password })

    const compareHash = await bcrypt.compare(password, user.password)

    expect(compareHash).toBe(true)
  })
})
