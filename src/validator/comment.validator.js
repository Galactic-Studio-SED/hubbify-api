const validateInput = require("./validateInput");

const validateCommentInput = (req, res, next) => {
  if (!req.body) {
    return;
  }

  const { content } = req.body;

  const isContentValid = validateInput(
    content,
    /^[a-zA-Z0-9_\s]+$/,
    255,
    "content",
    res
  );

  if (isContentValid) {
    next();
  }
};

module.exports = validateCommentInput;
