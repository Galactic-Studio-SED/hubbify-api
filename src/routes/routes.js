const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  singin,
} = require("../controller/user.controller");

const routes = [
  {
    method: "GET",
    url: "/api/users",
    handler: getAllUser,
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
  {
    method: "POST",
    url: "/api/users/singin",
    handler: singin,
  },
];

module.exports = routes;
