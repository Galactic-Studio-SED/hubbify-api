const validateInput = require("./validateInput");

const validateLoginInput = (req, res, next) => {
  if (!req.body) {
    return;
  }

  const { password, email } = req.body;

  const isPasswordValid = validateInput(password, null, 255, "password", res);
  const isEmailValid = validateInput(
    email,
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    255,
    "email",
    res
  );

  if (isPasswordValid && isEmailValid) {
    next();
  }
};

module.exports = validateLoginInput;
