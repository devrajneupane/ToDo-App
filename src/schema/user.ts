import Joi from "joi";

export const createUserBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),

  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be in a valid format",
  }),

  password: Joi.string()
    .required()
    .min(8)
    .messages({
      "any.required": "Password is required",
      "string.min": "Password must be atleast 8 character",
      "password.uppercase": "Password must contain a uppercase character",
      "password.lowercase": "Password must contain a lowercase character",
      "password.special": "Password must contain a special character",
      "password.number": "Password must contain a number",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[!@#$%^&*]/.test(value)) {
        return helpers.error("password.special");
      }
      if (!/[0-9]/.test(value)) {
        return helpers.error("password.number");
      }

      return value;
    }),
}).options({
  stripUnknown: true,
});

export const updateUserBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),

  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be in a valid format",
  }),

  password: Joi.string()
    .required()
    .min(8)
    .messages({
      "any.required": "Password is required",
      "string.min": "Password must be atleast 8 character",
      "password.uppercase": "Password must contain a uppercase character",
      "password.lowercase": "Password must contain a lowercase character",
      "password.special": "Password must contain a special character",
      "password.number": "Password must contain a number",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[!@#$%^&*]/.test(value)) {
        return helpers.error("password.special");
      }
      if (!/[0-9]/.test(value)) {
        return helpers.error("password.number");
      }

      return value;
    }),
}).options({
  stripUnknown: true,
});

export const userIdQuerySchema = Joi.object({
  id: Joi.string().guid().optional().messages({
    "string.guid": "ID must be a valid guid",
  }),
}).options({ stripUnknown: true });
