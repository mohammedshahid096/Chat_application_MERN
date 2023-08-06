const createError = require("http-errors");
const UserModel = require("../SchemaModels/user.model");
const TokenGenerator = require("../Middlewares/Cookie_Token_Gen");
const cloudinary = require("cloudinary");

// !---------------------------------

// TODO : Registering the user Controller
module.exports.RegisterUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const profile = req.file;

    if (!name || !email || !password) {
      return next(createError.BadRequest("Please Enter all the fields"));
    }

    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      return next(createError.BadGateway("User already exists"));
    }

    let Details = {
      name,
      email,
      password,
    };

    if (profile) {
      // upload a photo on cloud
      const myCloud = await cloudinary.v2.uploader.upload(profile.path, {
        folder: "ChatProjectMERN",
      });

      Details.profile = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    const user = await UserModel(Details);
    await user.save();

    await TokenGenerator.createCookie(user, 201, res);
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : Login the user
module.exports.LoginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(createError.BadRequest("Please enter the all fields"));
    }

    const isExist = await UserModel.findOne({ email }).select("+password");

    if (!isExist) {
      return next(createError.BadGateway("user or email is not correct"));
    }
    const ispasswordmatch = await TokenGenerator.passwordVerify(
      password,
      isExist.password
    );
    if (ispasswordmatch === false) {
      return next(createError.BadRequest("Email or Password is not match"));
    }
    await TokenGenerator.createCookie(isExist, 200, res);
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

module.exports.logoutController = (req, res, next) => {
  try {
    res.clearCookie("ChatToken").status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

module.exports.UserProfile = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : Search the User
module.exports.SearchUserController = async (req, res, next) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
          $and: [{ _id: { $ne: req.user._id } }],
        }
      : {};

    const users = await UserModel.find(keyword);

    res.status(200).json({
      success: true,
      users,
      TotalUsers: users.length,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

module.exports.UpdateUserProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findById("64b7a1d2604d8f1a646f25a9");
    user.name = "Mohd Shahid";
    user.password = "12345678";
    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};
