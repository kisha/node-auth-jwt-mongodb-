const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = {
    name: Joi.string()
      .min(5)
      .required(),
    email: Joi.string()
      .min(5)
      .required()
      .email(),
    password: Joi.string()
      .min(7)
      .required()
  };

  return Joi.validate(data,schema);
}

const loginValidation = (data) => {
  const schema = {
    email: Joi.string()
      .min(5)
      .required()
      .email(),
    password: Joi.string()
      .min(7)
      .required()
  };

  return Joi.validate(data,schema);
}





module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;