const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    taxCode: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minlength: 10,
      validate(value) {
        if (!value.match(/^\d{10}(-\d{3})?$/g)) {
          throw new Error('Invalid format tax code. It must contain at least ten numbers or more with hyphens');
        }
      },
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      validate(value) {
        if (!value.match(/^(0|(\+84))\d{9,10}$/g)) {
          throw new Error('Invalid format phone.');
        }
      },
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    representative: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
customerSchema.plugin(toJSON);
customerSchema.plugin(paginate);

/**
 * Check if tax code is taken
 * @param {string} taxCode - The customer's taxCode
 * @param {ObjectId} [excludecustomerId] - The id of the customer to be excluded
 * @returns {Promise<boolean>}
 */
customerSchema.statics.isTaxCodeTaken = async function (taxCode, excludecustomerId) {
  const customer = await this.findOne({ taxCode, _id: { $ne: excludecustomerId } });
  return !!customer;
};

/**
 * @typedef customer
 */
const customer = mongoose.model('customer', customerSchema);

module.exports = customer;
