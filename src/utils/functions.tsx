import Joi from 'joi';

export const clamp = (number: number, min: number, max: number) => {
  return Math.max(min, Math.min(number, max));
};

export const getJoiFormError = (details: Joi.ValidationErrorItem[]) => {
  const errors: any = {};
  details.forEach((item, index) => {
    errors[item.context?.key || index] = item.message;
  });

  return errors;
};
