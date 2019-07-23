const Joi = require('joi')
const validate = require('express-validation')

class PostValidator {
  store () {
    return validate({
      body: {
        text: Joi.string()
          .required()
          .min(2)
          .max(140)
      }
    })
  }

  update () {
    return validate({
      params: {
        id: Joi.number().required()
      },
      body: {
        text: Joi.string()
          .required()
          .min(2)
          .max(140)
      }
    })
  }
}

module.exports = new PostValidator()
