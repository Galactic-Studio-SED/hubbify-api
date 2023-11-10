const commentRoutes = require("./comment.routes");
const commentOwnRoutes = require("./comment_own.routes");
const userRoutes = require("./user.routes");
const userOwnRoutes = require("./user_own.routes");

const allRoutes = [
  ...commentRoutes,
  ...commentOwnRoutes,
  ...userRoutes,
  ...userOwnRoutes,
];

module.exports = allRoutes;
