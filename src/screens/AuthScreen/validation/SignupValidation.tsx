import 'text-encoding-polyfill';
import Joi from 'joi';

export default Joi.object({
  email: Joi.string()
    .email({tlds: {allow: false}}) // need to add this option to work with react native
    .required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().min(2).required(),
  onCheckTnc: Joi.boolean().required().invalid(false).messages({
    'any.invalid': 'Please accept the Terms and Conditions to continue',
    'any.required': 'Please accept the Terms and Conditions to continue',
  }),
});
