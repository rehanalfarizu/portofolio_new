exports.isEmailValid = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

exports.checkRequiredFields = (requiredFields, body) => {
  const missing = requiredFields.filter((field) => !body[field]);
  return missing.length ? `Missing fields: ${missing.join(', ')}` : null;
};
