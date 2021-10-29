const httpStatus = require('http-status');
const { Customer } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a customer
 * @param {Object} customerBody
 * @returns {Promise<Customer>}
 */
const createCustomer = async (customerBody) => {
  if (await Customer.isTaxCodeTaken(customerBody.taxCode)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tax code already taken');
  }
  return Customer.create(customerBody);
};

/**
 * Query for customers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCustomers = async (filter, options) => {
  const customers = await Customer.paginate(filter, options);
  return customers;
};

/**
 * Get customer by id
 * @param {ObjectId} id
 * @returns {Promise<Customer>}
 */
const getCustomerById = async (id) => {
  return Customer.findById(id);
};

/**
 * Get customer by taxCode
 * @param {string} taxCode
 * @returns {Promise<Customer>}
 */
const getCustomerByTaxCode = async (taxCode) => {
  return Customer.findOne({ taxCode });
};

/**
 * Update customer by id
 * @param {ObjectId} customerId
 * @param {Object} updateBody
 * @returns {Promise<Customer>}
 */
const updateCustomerById = async (customerId, updateBody) => {
  const customer = await getCustomerById(customerId);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }
  if (updateBody.taxCode && (await Customer.isTaxCodeTaken(updateBody.email, customerId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tax code already taken');
  }
  Object.assign(customer, updateBody);
  await customer.save();
  return customer;
};

/**
 * Delete customer by id
 * @param {ObjectId} customerId
 * @returns {Promise<Customer>}
 */
const deleteCustomerById = async (customerId) => {
  const customer = await getCustomerById(customerId);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }
  await customer.remove();
  return customer;
};

module.exports = {
  createCustomer,
  queryCustomers,
  getCustomerById,
  getCustomerByTaxCode,
  updateCustomerById,
  deleteCustomerById,
};
