import 'text-encoding-polyfill';
import Joi from 'joi';

export default Joi.object({
  email: Joi.string()
    .email({tlds: {allow: false}}) // need to add this option to work with react native
    .required()
    .messages({
      'string.empty': 'Please enter a valid email address',
      'string.email': 'Please enter a valid email address',
      'any.required': 'Please enter a valid email address',
    }),
});
