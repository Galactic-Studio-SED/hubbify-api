const helper = require("../helper/response.helper");
const jwt = require("../tools/jwt.tools");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { encrypt, decrypt } = require("../tools/crypto.tools");
const {
  createUserModel,
  getAllUserModel,
  getUserByIdModel,
  updateUserModel,
  upgradeUserModel,
  deleteUserModel,
  getUserByEmail,
  updateUserToken,
} = require("../model/user.model");
const cookie = require("cookie");

const applicationUser = process.env.APPLICATION_USR || "";
const applicationAdm = process.env.APPLICATION_ADM || "";
const s_round = process.env.USER_PSWD_SALT_ROUNDS || 10;

const generateUniqueId = () => {
  return crypto.randomUUID();
};

module.exports = {
  publicSingup: async (req, res) => {
    try {
      const userId = generateUniqueId();
      const { username, email, password, phone, birthdate } = req.body;

      const salt = bcrypt.genSaltSync(parseInt(s_round));
      const _email = encrypt(email);
      const _phone = encrypt(phone);
      const _password = bcrypt.hashSync(password, salt);

      const setData = {
        id: userId,
        username,
        email: _email,
        password: _password,
        phone: _phone,
        birthdate,
        role: applicationUser,
        salt,
      };

      const result = await createUserModel(setData);
      return helper.response(res, 200, "Success create user", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  adminGenerator: async (req, res) => {
    try {
      const admId = generateUniqueId();
      const { username, email, password, phone, birthdate } = req.body;

      const salt = bcrypt.genSaltSync(parseInt(s_round));
      const _email = encrypt(email);
      const _phone = encrypt(phone);
      const _password = bcrypt.hashSync(password, salt);

      const setData = {
        id: admId,
        username,
        email: _email,
        password: _password,
        phone: _phone,
        birthdate,
        role: applicationAdm,
        salt,
      };

      const result = await createUserModel(setData);
      return helper.response(res, 200, "Success create user", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  getAllUser: async (req, res) => {
    try {
      let result = await getAllUserModel();
      result = result.map((user) => {
        return {
          id: user.id,
          username: user.username,
          password: user.password,
          email: decrypt(user.email),
          phone: decrypt(user.phone),
          role: user.role,
          birthdate: user.birthdate,
          address: user.address,
          banned: user.banned,
          token: user.token,
        };
      });
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
        const { email, phone } = result[0];
        result[0].email = decrypt(email);
        result[0].phone = decrypt(phone);
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

  getOwnUser: async (req, res) => {
    try {
      const { id } = req.user;
      const result = await getUserByIdModel(id);

      if (result.length > 0) {
        const { email, phone } = result[0];
        result[0].email = decrypt(email);
        result[0].phone = decrypt(phone);

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
      const { username, email, password, phone, birthdate } = req.body;

      const _email = encrypt(email);
      const _phone = encrypt(phone);
      let salt, _password, setData;
      if (password) {
        salt = bcrypt.genSaltSync(parseInt(s_round));
        _password = bcrypt.hashSync(password, salt);

        setData = {
          username,
          email: _email,
          password: _password,
          phone: _phone,
          birthdate,
          salt,
        };
      } else {
        setData = {
          username,
          email: _email,
          phone: _phone,
          birthdate,
          salt,
        };
      }

      const checkId = await getUserByIdModel(id);
      if (checkId.length > 0) {
        const result = await updateUserModel(setData, id);
        if (result.lenght > 0) {
          const { email, phone } = result[0];
          result[0].email = decrypt(email);
          result[0].phone = decrypt(phone);
        }
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

  upgradeUser: async (req, res) => {
    try {
      const { id } = req.params;

      const checkId = await getUserByIdModel(id);

      if (checkId.length > 0) {
        const result = await upgradeUserModel(id);
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

  updateOwnUser: async (req, res) => {
    try {
      const { id } = req.user;
      const { username, email, password, phone, birthdate } = req.body;

      const salt = bcrypt.genSaltSync(parseInt(s_round));
      const _email = encrypt(email);
      const _phone = encrypt(phone);
      const _password = bcrypt.hashSync(password, salt);

      const setData = {
        username,
        email: _email,
        password: _password,
        phone: _phone,
        birthdate,
      };

      const checkId = await getUserByIdModel(id);
      if (checkId.length > 0) {
        const result = await updateUserModel(setData, id);
        if (result) {
          const { email, phone } = result;
          result.email = decrypt(email);
          result.phone = decrypt(phone);
        }
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

  deleteOwnUser: async (req, res) => {
    try {
      const { id } = req.user;
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
      const user = await getUserByEmail(encrypt(email));

      if (!user || !Array.isArray(user) || user.length === 0)
        return helper.response(res, 401, "User does not exist");

      const {
        id,
        email: userEmail,
        password: userPassword,
        username,
        birthdate,
        role,
      } = user[0];

      //check passwords
      if (!bcrypt.compareSync(password, userPassword))
        return helper.response(res, 401, "Incorrect password");

      const token = jwt.generateToken(id);

      const response = await updateUserToken(id, token);

      // Set the cookie
      const cookieOptions = {
        httpOnly: true, // The cookie will not be accessible through JavaScript in the browser
        secure: true, // The cookie will only be sent if the connection is secure (HTTPS)
        sameSite: "Strict", // Cookie will not be sent on third party requests
        maxAge: 3600, // The duration of the cookie in seconds
      };

      // Create the cookie
      const jwtCookie = cookie.serialize("jwt", token, cookieOptions);

      // Add the cookie to the response
      res.setHeader("Set-Cookie", jwtCookie);

      return helper.response(res, 200, `Token added successfully on ${id}`, {
        user: id,
        username: username,
        email: decrypt(userEmail),
        token,
        roles: role,
      });
    } catch (error) {
      return helper.response(res, 400, "Bad request", error);
    }
  },
};
