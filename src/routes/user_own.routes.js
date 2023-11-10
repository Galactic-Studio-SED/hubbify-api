const {
  authentication,
  authorization,
} = require("../middleware/auth.middleware");

const {
  getOwnUser,
  updateOwnUser,
  deleteOwnUser,
} = require("../controller/user.controller");

const validateUserInput = require("../validator/user.validator");

const applicationAdm = process.env.APPLICATION_ADM || "";
const applicationUser = process.env.APPLICATION_USR || "";
const applicationSuperAdm = process.env.APPLICATION_SDM || "";

const routes = [
  {
    method: "GET",
    url: "/api/users/own",
    handler: getOwnUser,
    middleware: [
      authentication,
      authorization([applicationUser, applicationAdm, applicationSuperAdm]),
    ],
  },
  {
    method: "PUT",
    url: "/api/users/own",
    handler: updateOwnUser,
    middleware: [
      authentication,
      authorization([applicationUser, applicationAdm, applicationSuperAdm]),
      validateUserInput,
    ],
  },
  {
    method: "DELETE",
    url: "/api/users/own",
    handler: deleteOwnUser,
    middleware: [
      authentication,
      authorization([applicationUser, applicationAdm, applicationSuperAdm]),
    ],
  },
];

module.exports = routes;
