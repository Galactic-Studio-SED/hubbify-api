const {
  authentication,
  authorization,
} = require("../middleware/auth.middleware");

const {
  getAllUser,
  getUserById,
  publicSingup,
  adminGenerator,
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
    middleware: [authentication, authorization([applicationSuperAdm])],
  },
  {
    method: "GET",
    url: "/api/users/:id",
    handler: getUserById,
    middleware: [
      authentication,
      authorization([applicationUser, applicationAdm, applicationSuperAdm]),
    ],
  },
  {
    method: "POST",
    url: "/api/users",
    handler: publicSingup,
  },
  {
    method: "POST",
    url: "/api/users/adm",
    handler: adminGenerator,
    middleware: [authentication, authorization([applicationSuperAdm])],
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
    middleware: [
      authentication,
      authorization([applicationUser, applicationAdm]),
    ],
  },
  {
    method: "DELETE",
    url: "/api/users/:id",
    handler: deleteUser,
    middleware: [
      authentication,
      authorization([applicationUser, applicationSuperAdm]),
    ],
  },
];

module.exports = routes;
