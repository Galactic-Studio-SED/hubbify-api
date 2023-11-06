const { verifyToken } = require("../tools/jwt.tools");
const dotenv = require("dotenv");
const helper = require("../helper/response.helper");
const { getUserByIdModel } = require("../model/user.model");

dotenv.config();

const tokenPrefix = process.env.TOKEN_PREFIX;
const applicationAdm = process.env.APPLICATION_ADM || "";
const applicationUser = process.env.APPLICATION_USR || "";
const applicationSuperAdm = process.env.APPLICATION_SDM || "";

const middlewares = {};

middlewares.authentication = async (req, res, next) => {
  try {
    //verify authorization
    const { authorization } = req.headers || null;
    if (!authorization) {
      console.log(
        `some user trying to send petitions without header authorization`
      );
      return helper.response(res, 401, "Bad credentials");
    }

    //verify header
    const [prefix, token] = authorization.split(" ");
    if (prefix != tokenPrefix) {
      console.log(`some user trying to send petitions without header prefix`);
      return helper.response(res, 401, "Bad credentials");
    }
    if (!token) {
      console.log(`some user trying to send petitions without header token`);
      return helper.response(res, 401, "Bad credentials");
    }

    //verify if token is validate

    const tokenValidation = verifyToken(token);
    if (!tokenValidation) return helper.response(res, 401, "Bad credentials");

    const { userId } = tokenValidation;

    //check user exists
    const user = await getUserByIdModel(userId);
    if (!user || user.lenght < 0) {
      console.log(`user ${userId} trying to send petitions with errors`);
      return helper.response(res, 401, "Bad credentials");
    }

    //verify token belongs to user
    const { token: userToken, role, username, banned, email } = user[0];
    const isTokenFromUser = userToken === token;
    if (!isTokenFromUser) {
      console.log(
        `user ${userId} trying to send petitions with an invalid token`
      );
      return helper.response(res, 401, "Bad credentials");
    }

    req.user = {
      role: role,
      username: username,
      banned: banned,
      email: email,
    };
    req.token = token;
    next();
  } catch (error) {
    console.log(error.message);
    helper.response(res, 500, "Unexpected internal server error", error);
  }
};

middlewares.authorization = (requestedRoles) => {
  return async (req, res, next) => {
    try {
      if (req.user === undefined || req.user === null) {
        console.log(
          "Denied petition to user trying to access without authorization"
        );
        return helper.response(res, 403, "Unauthorized");
      }
      //getting role from user
      const { role } = req.user || null;

      //check if there is application roles defined in environment
      if (!applicationAdm || !applicationSuperAdm || !applicationUser) {
        console.log("internal error not defined");
        return helper.response(res, 403, "Unauthorized");
      }

      //checking wether role does or not exists
      const index = requestedRoles.findIndex((rol) => rol === role);

      //then less than 0 means no role found that match the requested
      if (index < 0) {
        console.log(`User ${req.user.email} trying to get access denied`);
        return helper.response(res, 403, "Unauthorized");
      }

      //move on
      next();
    } catch (error) {
      console.log(error.message);
      return helper.response(res, 500, "Unexpected server error", error);
    }
  };
};

module.exports = middlewares;
