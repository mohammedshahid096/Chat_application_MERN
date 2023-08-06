const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const UserModel = require("../SchemaModels/user.model");

// TODO :for authentication
module.exports.authentication = async (req, res, next) => {
  try {
    const { ChatToken } = req.cookies;

    if (!ChatToken) {
      return next(createError.Unauthorized("Authentication is Required"));
    }

    // if (!req.headers["authorization"]) {
    //   return next(createError.Unauthorized("Authorization Header Error"));
    // }
    // const AuthToken = req.headers["authorization"].split(" ")[1];

    // if (AuthToken !== DpToken) {
    //   return next(createError.Unauthorized("Authorization is not matching"));
    // }

    const decodetoken = jwt.verify(ChatToken, process.env.JWT_SECRET_KEY);
    if (!decodetoken) {
      return next(createError.NetworkAuthenticationRequire("check the token"));
    }

    const user = await UserModel.findById(decodetoken.user);
    if (!user) {
      return next(createError.NotFound("check  the token and the user"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};
