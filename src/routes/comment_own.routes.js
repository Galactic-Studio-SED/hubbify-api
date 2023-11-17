const {
  authentication,
  authorization,
} = require("../middleware/auth.middleware");

const {
  getAllOwnComment,
  createComment,
  updateOwnComment,
  deleteOwnComment,
} = require("../controller/comment.controller");

const {
  validateReference,
  validateId,
} = require("../validator/uuid.validator");
const validateCommentInput = require("../validator/comment.validator");

const applicationAdm = process.env.APPLICATION_ADM || "";
const applicationUser = process.env.APPLICATION_USR || "";
const applicationSuperAdm = process.env.APPLICATION_SDM || "";

const routes = [
  {
    method: "GET",
    url: "/api/comments/own",
    handler: getAllOwnComment,
    middleware: [
      authentication,
      authorization([applicationUser, applicationAdm, applicationSuperAdm]),
    ],
  },
  {
    method: "POST",
    url: "/api/comments/own",
    handler: createComment,
    middleware: [
      authentication,
      authorization([applicationUser, applicationAdm, applicationSuperAdm]),
      validateReference,
      validateCommentInput,
    ],
  },
  {
    method: "PUT",
    url: "/api/comments/own/:id",
    handler: updateOwnComment,
    middleware: [
      authentication,
      authorization([applicationUser, applicationAdm, applicationSuperAdm]),
      validateId,
      validateCommentInput,
    ],
  },
  {
    method: "DELETE",
    url: "/api/comments/own/:id",
    handler: deleteOwnComment,
    middleware: [
      authentication,
      authorization([applicationUser, applicationAdm, applicationSuperAdm]),
      validateId,
    ],
  },
];

module.exports = routes;
