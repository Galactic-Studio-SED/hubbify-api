const validateInput = require("./validateInput");
const { sendError } = require("../helper/response.helper");

const validateUserInput = (req, res, next) => {
  if (!req.body) {
    sendError(res, 400, `Request body cannot be empty`);
    return;
  }

  const { username, password, email, phone } = req.body;

  if (!validateInput(username, /^[a-zA-Z0-9_\s]+$/, 255, "username", res))
    return;
  if (!validateInput(password, null, 255, "password", res)) return;
  if (!validateInput(phone, /^[\d()-\s]+$/, 20, "phone number", res)) return;

  if (
    !validateInput(
      email,
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      255,
      "email",
      res
    )
  )
    return;

  next();
};

module.exports = validateUserInput;
