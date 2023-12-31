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
  upgradeUser,
  deleteUser,
  singin,
} = require("../controller/user.controller");

const { validateId } = require("../validator/uuid.validator");
const validateUserInput = require("../validator/user.validator");
const validateLoginInput = require("../validator/login.validator");

const applicationAdm = process.env.APPLICATION_ADM || "";
const applicationUser = process.env.APPLICATION_USR || "";
const applicationSuperAdm = process.env.APPLICATION_SDM || "";

const routes = [
  {
    method: "GET",
    url: "/api/users",
    handler: getAllUser,
    middleware: [
      authentication,
      authorization([applicationAdm, applicationSuperAdm]),
    ],
  },
  {
    method: "GET",
    url: "/api/users/:id",
    handler: getUserById,
    middleware: [
      authentication,
      authorization([applicationAdm, applicationSuperAdm]),
      validateId,
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
    middleware: [validateLoginInput],
  },
  {
    method: "PUT",
    url: "/api/users/:id",
    handler: updateUser,
    middleware: [
      authentication,
      authorization([applicationAdm, applicationSuperAdm]),
      validateId,
      validateUserInput,
    ],
  },
  {
    method: "PUT",
    url: "/api/users/upgrade/:id",
    handler: upgradeUser,
    middleware: [
      authentication,
      authorization([applicationAdm, applicationSuperAdm]),
      validateId,
    ],
  },
  {
    method: "DELETE",
    url: "/api/users/:id",
    handler: deleteUser,
    middleware: [
      authentication,
      authorization([applicationSuperAdm, applicationAdm]),
      validateId,
    ],
  },
];

module.exports = routes;
