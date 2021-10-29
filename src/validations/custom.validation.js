const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const taxCode = (value, helpers) => {
  if (value.length < 10) {
    return helpers.message('tax code must be at least 10 characters');
  }
  if (!value.match(/^\d{10}(-\d{3})?$/)) {
    return helpers.message('password must contain at least 10 characters or more with hyphens');
  }
  return value;
};

const phone = (value, helpers) => {
  if (value.length < 10) {
    return helpers.message('phone number must be at least 10 characters');
  }
  if (!value.match(/^(0|(\+84))\d{9,10}$/)) {
    return helpers.message('password must contain at least 10 characters, starts with 0 or +84');
  }
  return value;
};

module.exports = {
  objectId,
  password,
  taxCode,
  phone,
};
