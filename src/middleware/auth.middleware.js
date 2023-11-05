const { verifyToken } = require("../tools/jwt.tools");
const dotenv = require("dotenv");
const helper = require("../helper/response.helper");
const { getUserByIdModel } = require("../model/user.model");

dotenv.config();

const tokenPrefix = process.env.TOKEN_PREFIX;
const applicationRoles = process.env.APPLICATION_ROLES || "";

const middlewares = {};

middlewares.authentication = async (req, res, next) => {
  try {
    //verify authorization
    const { authorization } = req.headers;
    if (!authorization) return helper.response(res, 401, "Unauthorized");

    //verify header
    const [prefix, token] = authorization.split(" ");
    if (prefix != tokenPrefix) return helper.response(res, 401, "Unauthorized");
    if (!token) return helper.response(res, 401, "Unauthorized");

    //verify if token is validate

    const tokenValidation = verifyToken(token);
    if (!tokenValidation) return helper.response(res, 401, "Unauthorized");

    const { uesrId } = tokenValidation;

    //check user exists
    const user = await getUserByIdModel(uesrId);
    if (!user) return helper.response(res, 401, "Unauthorized");

    //verify token belongs to user
    const isTokenFromUser = user.token === token;
    if (!isTokenFromUser) return helper.response(res, 401, "Unauthorized");

    req.user = {
      role: user.role,
      username: user.username,
      banned: user.banned,
      email: user.email,
    };
    req.token = token;

    next();
  } catch (error) {
    console.log(error.message);
    return helper.response(res, 500, "Unexpected internal error");
  }
};

middlewares.authorization = () => {
  return async (req, res, next) => {
    try {
      //getting role from user
      const { role } = req.user || null;
      const _appRoles = applicationRoles.split(" ") || [];

      //checking wether role does or not exists
      const index = _appRoles.findIndex((rol) => rol === role);

      //then less than 0 means no role found
      if (index < 0) return helper.response(res, 403, "Unauthorized");

      next();
    } catch (error) {
      console.log(error.message);
      return helper.response(res, 500, "Unexpected server error", error);
    }
  };
};

module.exports = middlewares;
