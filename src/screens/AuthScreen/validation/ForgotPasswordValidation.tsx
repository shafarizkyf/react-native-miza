import 'text-encoding-polyfill';
import Joi from 'joi';

export default Joi.object({
  email: Joi.string()
    .email({tlds: {allow: false}}) // need to add this option to work with react native
    .required(),
});
