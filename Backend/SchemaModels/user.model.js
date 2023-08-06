const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profile: {
      public_id: {
        type: String,
        default: "ChatProjectMERN/ptf9embkszp4yjyput8s",
      },
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dml8opujw/image/upload/v1689786795/ChatProjectMERN/ptf9embkszp4yjyput8s.png",
      },
    },
  },
  { timestamps: true }
);

ModelSchema.pre("save", async function (next) {
  // if it is not modified or updated then it directly go to next it will not hash any more
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const UserModel = mongoose.model("usercollections", ModelSchema);

module.exports = UserModel;
