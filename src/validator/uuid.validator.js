const { sendError } = require("../helper/response.helper");

const isValidUUID = (res, data) => {
  const uuidPattern =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidPattern.test(data)) {
    //sendError(res, 400, `Invalid ID format`);
    return false;
  }

  return true;
};

const validateReference = (req, res, next) => {
  if (!req.body) {
    return sendError(res, 400, `Request body cannot be empty`);
  }

  const { id } = req.user;

  if (!isValidUUID(res, id)) return sendError(res, 400, "Invalid ID");

  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  if (!isValidUUID(res, id)) return sendError(res, 400, "Invalid ID");
  if (userId)
    if (!isValidUUID(res, id)) return sendError(res, 400, "Invalid user ID");

  next();
};

module.exports = {
  validateReference,
  validateId,
};
