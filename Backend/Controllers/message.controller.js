const createError = require("http-errors");
const UserModel = require("../SchemaModels/user.model");
const ChatModel = require("../SchemaModels/chat.model");
const MessageModel = require("../SchemaModels/message.model");

module.exports.SendMessage = async (req, res, next) => {
  try {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
      return next(createError.BadRequest("Invalid data passed into request"));
    }
    let newMessage = {
      sender: req.user._id,
      content,
      chat: chatId,
    };

    let message = await MessageModel(newMessage);
    await message.save();

    await ChatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message._id,
    });

    message = await MessageModel.populate(message, {
      path: "sender",
      select: "name profile",
    });
    message = await MessageModel.populate(message, { path: "chat" });
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "name profile email",
    });

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

module.exports.AllMesssages = async (req, res, next) => {
  try {
    const messages = await MessageModel.find({ chat: req.params.chatId })
      .populate("sender", "name profile email")
      .populate("chat");

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};
