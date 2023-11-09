const {
  getAllComment,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} = require("../controller/comment.controller");

const { validateReference, validateId } = require("../validator/uuid.validator");
const validateCommentInput = require("../validator/comment.validator");

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
    middleware: [validateReference, validateCommentInput],
  },
  {
    method: "PUT",
    url: "/api/comments/:id",
    handler: updateComment,
    middleware: [validateId, validateCommentInput],
  },
  {
    method: "DELETE",
    url: "/api/comments/:id",
    handler: deleteComment,
    middleware: [validateId],
  },
];

module.exports = routes;
