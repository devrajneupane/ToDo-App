import Joi from "joi";

import { TASK_STATUS } from "../enums/TaskStatus";

const checkStatus = (value: TASK_STATUS, helpers: Joi.CustomHelpers) => {
  if (!Object.values(TASK_STATUS).includes(value)) {
    return helpers.error("status.base");
  }
  return value;
};

export const createTaskBodySchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title of task is required",
  }),
  desc: Joi.string().required().messages({
    "any.required": "Descripition of task is required",
  }),
  status: Joi.string()
    .optional()
    .valid(...Object.values(TASK_STATUS))
    .messages({
      "any.only": `Status must be one of ${Object.values(TASK_STATUS).join(", ")}`,
    })
    .custom(checkStatus),
});

export const updateTaskBodySchema = Joi.object({
  title: Joi.string().optional().messages({
    "string.base": "Title must be string",
  }),
  desc: Joi.string().optional().messages({
    "string.base": "Descripition must be string",
  }),
  status: Joi.string()
    .optional()
    .messages({
      "any.only": `Status must be one of ${Object.values(TASK_STATUS).join(", ")}`,
    })
    .custom(checkStatus),
});

export const taskIdParamSchema = Joi.object({
  id: Joi.string().guid().required().messages({
    "any.required": "ID is required",
    "string.guid": "ID must be a valid guid",
  }),
});
