const commentRoutes = require("./comment.routes");
const userRoutes = require("./user.routes");

const allRoutes = [...commentRoutes, ...userRoutes];

module.exports = allRoutes;
