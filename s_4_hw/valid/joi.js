const Joi = require("joi");

const userSchema = Joi.object({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  age: Joi.number().greater(1).less(150).required(),
  city: Joi.string().min(1),
});

module.exports = { userSchema };
