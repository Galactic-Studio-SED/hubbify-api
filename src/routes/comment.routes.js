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
  },
  {
    method: "POST",
    url: "/api/comments",
    handler: createComment,
    middleware: [
      authentication,
      authorization([applicationUser, applicationAdm]),
    ],
  },
  {
    method: "PUT",
    url: "/api/comments/:id",
    handler: updateComment,
    middleware: [
      authentication,
      authorization([applicationUser, applicationAdm]),
    ],
  },
  {
    method: "DELETE",
    url: "/api/comments/:id",
    handler: deleteComment,
    middleware: [
      authentication,
      authorization([applicationUser, applicationAdm]),
    ],
  },
];

module.exports = routes;
