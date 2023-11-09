const validateInput = require("./validateInput");
const { sendError } = require("../helper/response.helper");

const validateLoginInput = (req, res, next) => {
  if (!req.body) {
    sendError(res, 400, `Request body cannot be empty`);
    return;
  }

  const { password, email } = req.body;

  if (!validateInput(password, null, 255, "password", res)) return;
  if (!
    validateInput(
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

module.exports = validateLoginInput;
