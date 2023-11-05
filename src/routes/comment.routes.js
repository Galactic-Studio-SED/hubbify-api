const {
  getAllComment,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} = require("../controller/comment.controller");

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
  },
  {
    method: "POST",
    url: "/api/comments",
    handler: createComment,
  },
  {
    method: "PUT",
    url: "/api/comments/:id",
    handler: updateComment,
  },
  {
    method: "DELETE",
    url: "/api/comments/:id",
    handler: deleteComment,
  },
];

module.exports = routes;
