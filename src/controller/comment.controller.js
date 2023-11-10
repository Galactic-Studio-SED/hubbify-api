const helper = require("../helper/response.helper");
const crypto = require("crypto");
const {
  createCommentModel,
  getAllCommentModel,
  getCommentByIdModel,
  updateCommentModel,
  deleteCommentModel,
  getAllOwnCommentModel,
  getCommentByIdAndUserIdModel,
} = require("../model/comment.model");

const generateUniqueId = () => {
  return crypto.randomUUID();
};

module.exports = {
  createComment: async (req, res) => {
    try {
      const commentId = generateUniqueId();
      const { content } = req.body;
      const { id } = req.user;

      const setData = {
        id: commentId,
        userId: id,
        content,
      };

      const result = await createCommentModel(setData);
      return helper.response(res, 200, "Success create comment", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  getAllComment: async (req, res) => {
    try {
      const result = await getAllCommentModel();
      return helper.response(res, 200, "Success get all comments", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  getAllOwnComment: async (req, res) => {
    try {
      const { id } = req.user;
      const result = await getAllOwnCommentModel(id);
      return helper.response(res, 200, "Success get all comments", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  getCommentById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getCommentByIdModel(id);

      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Success get comment by id ${id}`,
          result
        );
      } else {
        return helper.response(res, 404, `Comment by id ${id} not found`, null);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  updateComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;

      const setData = {
        content,
      };

      const checkId = await getCommentByIdModel(id);
      if (checkId.length > 0) {
        const result = await updateCommentModel(setData, id);
        return helper.response(
          res,
          200,
          `Success update comment by id ${id}`,
          result
        );
      } else {
        return helper.response(res, 404, `Comment by id ${id} not found`, null);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  updateOwnComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const { id: userId } = req.user;

      const setData = {
        content,
      };

      const checkId = await getCommentByIdAndUserIdModel(id, userId);
      if (checkId.length > 0) {
        const result = await updateCommentModel(setData, id);
        return helper.response(
          res,
          200,
          `Success update comment by id ${id}`,
          result
        );
      } else {
        return helper.response(res, 404, `Comment by id ${id} not found`, null);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await getCommentByIdModel(id);
      if (checkId.length > 0) {
        const result = await deleteCommentModel(id);
        return helper.response(
          res,
          200,
          `Success delete comment by id ${id}`,
          result
        );
      } else {
        return helper.response(res, 404, `Comment by id ${id} not found`, null);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  deleteOwnComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;

      const checkId = await getCommentByIdAndUserIdModel(id, userId);
      if (checkId.length > 0) {
        const result = await deleteCommentModel(id);
        return helper.response(
          res,
          200,
          `Success delete comment by id ${id}`,
          result
        );
      } else {
        return helper.response(res, 404, `Comment by id ${id} not found`, null);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
