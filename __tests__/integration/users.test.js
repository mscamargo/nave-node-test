const faker = require('faker')
const request = require('supertest')

const app = require('../../src/app')
const truncateTables = require('../utils/truncate-tables')
const factory = require('../utils/factories')
const jwt = require('../../src/utils/jwt')

describe('Users Resource', () => {
  beforeEach(async () => {
    await truncateTables()
  })

  describe('GET /users', () => {
    it('should be able to view all users if authenticated', async () => {
      const user = await factory.create('User')

      const token = jwt.generate(user)

      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        .send()

      expect(response.status).toEqual(200)
    })

    it('should not be able to view all users if not authenticated', async () => {
      const response = await request(app).get('/users').send()

      expect(response.status).toEqual(401)
    })

    it('should be able to view other users account if authenticated', async () => {
      const users = await factory.createMany('User', 2, [
        { username: 'user0', email: 'user0@gmail.com' },
        { username: 'user1', email: 'user1@gmail.com' }
      ])

      const token = jwt.generate(users[0])

      const response = await request(app)
        .get(`/users/${users[1].id}`)
        .set('Authorization', `Bearer ${token}`)
        .send()

      expect(response.status).toEqual(200)
    })
  })

  describe('POST /users', () => {
    it('should be able to create user with valid attributes', async () => {
      const response = await request(app).post('/users').send({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        title: faker.name.findName(),
        password: faker.internet.password()
      })

      expect(response.status).toEqual(201)
    })

    it('should not be able to create user with invalid atrtributes', async () => {
      const response = await request(app).post('/users').send({})

      expect(response.status).toEqual(400)
    })

    it('should not be able to create a new user with an existing username', async () => {
      const { username } = await factory.create('User')

      const response = await request(app).post('/users').send({
        username,
        email: faker.internet.email(),
        password: faker.internet.password()
      })

      expect(response.status).toEqual(400)
    })

    it('should not be able to create a new user with an existing email', async () => {
      const { email } = await factory.create('User')

      const response = await request(app).post('/users').send({
        username: faker.internet.userName(),
        email,
        password: faker.internet.password()
      })

      expect(response.status).toEqual(400)
    })
  })

  describe('PUT /users', () => {
    it('should be able to update your account', async () => {
      const user = await factory.create('User')

      const token = jwt.generate(user)

      const response = await request(app)
        .put(`/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: faker.internet.userName()
        })

      expect(response.status).toEqual(200)
    })

    it('should not be able to update account of other users', async () => {
      const users = await factory.createMany('User', 2, [
        { username: 'user0', email: 'user0@gmail.com' },
        { username: 'user1', email: 'user1@gmail.com' }
      ])

      const token = jwt.generate(users[0])

      const response = await request(app)
        .put(`/users/${users[1].id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: faker.internet.userName()
        })

      expect(response.status).toEqual(403)
    })

    it('should not be able to update any account if not authenticated', async () => {
      const response = await request(app).put('/users/1').send()

      expect(response.status).toEqual(401)
    })
  })

  describe('DELETE /users', () => {
    it('should be able to delete your account', async () => {
      const user = await factory.create('User')

      const token = jwt.generate(user)

      const response = await request(app)
        .delete(`/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send()

      expect(response.status).toEqual(204)
    })

    it('should not be able to delete account of other users', async () => {
      const users = await factory.createMany('User', 2, [
        { username: 'user0', email: 'user0@gmail.com' },
        { username: 'user1', email: 'user1@gmail.com' }
      ])

      const token = jwt.generate(users[0])

      const response = await request(app)
        .delete(`/users/${users[1].id}`)
        .set('Authorization', `Bearer ${token}`)
        .send()

      expect(response.status).toEqual(403)
    })

    it('should not be able to delete any account if not authenticated', async () => {
      const response = await request(app).delete('/users/1').send()

      expect(response.status).toEqual(401)
    })
  })
})
