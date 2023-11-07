const { sendError } = require("../helper/response.helper");

const isValidUUID = (res, data) => {
  const uuidPattern =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidPattern.test(data)) {
    sendError(res, 400, `Invalid ID format`);
    return false;
  }

  return true;
};

const validateReference = (req, res, next) => {
  if (!req.body) {
    sendError(res, 400, `Request body cannot be empty`);
    return;
  }

  const { userId } = req.body;

  if (!isValidUUID(res, userId)) return;

  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidUUID(res, id)) return;

  next();
};

module.exports = {
  validateReference,
  validateId,
};
