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

const validateUserInput = require("../validator/user.validator");

const applicationAdm = process.env.APPLICATION_ADM || "";
const applicationUser = process.env.APPLICATION_USR || "";
const applicationSuperAdm = process.env.APPLICATION_SDM || "";

const routes = [
  {
    method: "GET",
    url: "/api/users",
    handler: getAllUser,
    middleware: [authentication, authorization([applicationAdm])],
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
    middleware: [validateUserInput],
  },
  {
    method: "POST",
    url: "/api/users/singin",
    handler: singin,
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
];

module.exports = routes;
