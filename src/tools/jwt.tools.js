const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secret = process.env.TOKEN_SECRET;
const expTime = process.env.TOKEN_EXP;

const tools = {};

tools.generateToken = (_id) => {
  return jwt.sign({ userId: _id }, secret, { expiresIn: expTime || 0 });
};

tools.verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
module.exports = tools;
