module.exports = {
  response: (res, status, message, data) => {
    const result = {};
    result.status = status || 200;
    result.message = message;
    result.data = data;

    res.statusCode = result.status;
    res.end(JSON.stringify(result));
  },
  sendError: (res, statusCode, message) => {
    res.end(JSON.stringify({ message: message }));
  },
};
