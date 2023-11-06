const { sendError } = require("../helper/response.helper");
const { escape } = require("mysql");

const validateUsername = (username) => {
  const usernamePattern = /^[a-zA-Z0-9_\s]+$/;
  return usernamePattern.test(username);
};

const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email) && email.length <= 255;
};

const validatePhone = (phone) => {
  const phonePattern = /^[\d()-\s]+$/;
  return phonePattern.test(phone);
};

const validateUserInput = (req, res, next) => {
  if (!req.body) {
    next();
  }
  
  const { username, email, phone } = req.body;

  if (!validateUsername(username)) {
    return sendError(res, 400, "Invalid username");
  }
  if (username.length > 255) {
    return sendError(res, 400, "Invalid username length");
  }
  if (!validateEmail(email)) {
    return sendError(res, 400, "Invalid email format");
  }
  if (username.length > 255) {
    return sendError(res, 400, "Invalid email length");
  }
  if (!validatePhone(phone)) {
    return sendError(res, 400, "Invalid phone number");
  }
  if (phone.length > 20) {
    return sendError(res, 400, "Invalid phone number length");
  }

  next();
};

module.exports = validateUserInput;
