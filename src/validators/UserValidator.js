const Joi = require('joi')
const validate = require('express-validation')

class UserValidator {
  store () {
    return validate({
      body: {
        username: Joi.string()
          .required()
          .min(2),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string().required(),
        title: Joi.string()
      }
    })
  }

  update () {
    return validate({
      params: {
        id: Joi.number().required()
      },
      body: {
        username: Joi.string().min(2),
        email: Joi.string().email(),
        password: Joi.string(),
        title: Joi.string()
      }
    })
  }
}

module.exports = new UserValidator()
