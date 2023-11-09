const helper = require("../helper/response.helper");
const jwt = require("../tools/jwt.tools");
const crypto = require('crypto');
const {
  createUserModel,
  getAllUserModel,
  getUserByIdModel,
  updateUserModel,
  deleteUserModel,
  getUserByEmail,
  updateUserToken,
} = require("../model/user.model");

const applicationUser = process.env.APPLICATION_USR || "";
const applicationAdm = process.env.APPLICATION_ADM || "";

const generateUniqueId = () => {
    return crypto.randomUUID();
};


module.exports = {
  publicSingup: async (req, res) => {
    try {
      const { username, email, password, phone } = req.body;

      const setData = {
        username,
        email,
        password,
        phone,
        role: applicationUser,
      };

      const result = await createUserModel(setData);
      return helper.response(res, 200, "Success create user", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  adminGenerator: async (req, res) => {
    try {
      const userId = generateUniqueId();
      const { username, email, password, phone } = req.body;

      const setData = {
        id: userId,
        username,
        email,
        password,
        phone,
        role: applicationAdm,
      };

      const result = await createUserModel(setData);
      return helper.response(res, 200, "Success create user", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  getAllUser: async (req, res) => {
    try {
      const result = await getAllUserModel();
      return helper.response(res, 200, "Success get all user", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getUserByIdModel(id);

      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Success get user by id ${id}`,
          result
        );
      } else {
        return helper.response(res, 404, `User by id ${id} not found`, null);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, password, phone } = req.body;

      const setData = {
        username,
        email,
        password,
        phone,
      };

      const checkId = await getUserByIdModel(id);
      if (checkId.length > 0) {
        const result = await updateUserModel(setData, id);
        return helper.response(
          res,
          200,
          `Success update user by id ${id}`,
          result
        );
      } else {
        return helper.response(res, 404, `User by id ${id} not found`, null);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await getUserByIdModel(id);

      if (checkId.length > 0) {
        const result = await deleteUserModel(id);
        return helper.response(
          res,
          200,
          `Success delete user by id ${id}`,
          result
        );
      } else {
        return helper.response(res, 404, `User by id ${id} not found`, null);
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  singin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await getUserByEmail(email);

      if (!user || user.lenght < 0)
        return helper.response(res, 401, "User does not exist");

      const {
        id,
        email: userEmail,
        password: userPassword,
        username,
      } = user[0];

      //check passwords
      if (userPassword != password)
        return helper.response(res, 401, "Incorrect password");

      const token = jwt.generateToken(id);

      const response = await updateUserToken(id, token);

      return helper.response(res, 200, `Token added successfully on ${id}`, {
        user: id,
        username: username,
        email: userEmail,
        token,
      });
    } catch (error) {
      return helper.response(res, 400, "Bad request", error);
    }
  },
};
