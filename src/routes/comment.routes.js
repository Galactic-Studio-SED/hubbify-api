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
    url: "/api/comments",
    handler: getAllComment,
  },
  {
    method: "GET",
    url: "/api/comments/:id",
    handler: getCommentById,
    middleware: [
      authentication,
      authorization([applicationAdm, applicationSuperAdm]),
      validateId,
    ],
  },
  {
    method: "DELETE",
    url: "/api/comments/:id",
    handler: deleteComment,
    middleware: [
      authentication,
      authorization([applicationAdm, applicationSuperAdm]),
      validateId,
    ],
  },
];

module.exports = routes;
