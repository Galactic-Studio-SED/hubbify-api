const validateInput = require("./validateInput");
const { sendError } = require("../helper/response.helper");

const validateCommentInput = (req, res, next) => {
  if (!req.body) {
    sendError(res, 400, `Request body cannot be empty`);
    return;
  }

  const { content } = req.body;

  if (!validateInput(content, /^[a-zA-Z0-9_\s]+$/, 255, "content", res)) return;

  next();
};

module.exports = validateCommentInput;
