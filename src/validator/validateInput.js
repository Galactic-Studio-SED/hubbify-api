const { sendError } = require("../helper/response.helper");

const validateInput = (input, pattern, maxLength, message, res) => {
  if (input === undefined || input === null || input.trim() === "") {
    sendError(res, 400, `Missing ${message}`);
    return false;
  }
  if (pattern && !pattern.test(input)) {
    sendError(res, 400, `Invalid ${message} format`);
    return false;
  }
  if (input.length > maxLength) {
    sendError(res, 400, `Invalid ${message} length`);
    return false;
  }
  return true;
};

module.exports = validateInput;
