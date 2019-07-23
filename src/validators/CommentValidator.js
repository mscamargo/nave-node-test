const Joi = require('joi')
const validate = require('express-validation')

class CommentValidator {
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

  delete () {
    return validate({
      params: {
        id: Joi.number().required()
      }
    })
  }
}

module.exports = new CommentValidator()
