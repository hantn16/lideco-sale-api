const Joi = require('joi');
const { phone, taxCode, objectId } = require('./custom.validation');

const createCustomer = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    phone: Joi.string().custom(phone),
    name: Joi.string().required(),
    taxCode: Joi.string().required().custom(taxCode),
  }),
};

const getCustomers = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCustomer = {
  params: Joi.object().keys({
    customerId: Joi.string().custom(objectId),
  }),
};

const updateCustomer = {
  params: Joi.object().keys({
    customerId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      taxCode: Joi.string().custom(taxCode),
      phone: Joi.string().custom(phone),
      name: Joi.string(),
    })
    .min(1),
};

const deleteCustomer = {
  params: Joi.object().keys({
    customerId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
