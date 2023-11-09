const {
  authentication,
  authorization,
} = require("../middleware/auth.middleware");

const {
  getAllComment,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} = require("../controller/comment.controller");

const { validateReference, validateId } = require("../validator/uuid.validator");
const validateCommentInput = require("../validator/comment.validator");

const applicationAdm = process.env.APPLICATION_ADM || "";
const applicationUser = process.env.APPLICATION_USR || "";
const applicationSuperAdm = process.env.APPLICATION_SDM || "";

const routes = [
  {
    method: "GET",
    url: "/api/comments",
    handler: getAllComment,
  },
  {
    method: "GET",
    url: "/api/comments/:id",
    handler: getCommentById,
    middleware: [validateId],
  },
  {
    method: "POST",
    url: "/api/comments",
    handler: createComment,
    middleware: [
      authentication,
      authorization([applicationUser, applicationAdm]),
      validateReference,
      validateCommentInput
    ],
  },
  {
    method: "PUT",
    url: "/api/comments/:id",
    handler: updateComment,
    middleware: [
      authentication,
      authorization([applicationUser, applicationAdm]),
      validateId,
      validateCommentInput
    ],
  },
  {
    method: "DELETE",
    url: "/api/comments/:id",
    handler: deleteComment,
    middleware: [
      authentication,
      authorization([applicationUser, applicationAdm]),
      validateId,
    ],
  },
];

module.exports = routes;
