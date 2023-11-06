const {
  authentication,
  authorization,
} = require("../middleware/auth.middleware");

const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  singin,
} = require("../controller/user.controller");

const applicationAdm = process.env.APPLICATION_ADM || "";
const applicationUser = process.env.APPLICATION_USR || "";
const applicationSuperAdm = process.env.APPLICATION_SDM || "";

const routes = [
  {
    method: "GET",
    url: "/api/users",
    middleware: [authentication, authorization([applicationAdm])],
    handler: getAllUser,
  },
  {
    method: "GET",
    url: "/api/users/:id",
    handler: getUserById,
  },
  {
    method: "POST",
    url: "/api/users",
    handler: createUser,
  },
  {
    method: "PUT",
    url: "/api/users/:id",
    handler: updateUser,
  },
  {
    method: "DELETE",
    url: "/api/users/:id",
    handler: deleteUser,
  },
  {
    method: "POST",
    url: "/api/users/singin",
    handler: singin,
  },
];

module.exports = routes;
