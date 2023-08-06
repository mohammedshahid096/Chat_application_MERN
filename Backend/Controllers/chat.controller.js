const createError = require("http-errors");
const UserModel = require("../SchemaModels/user.model");
const ChatModel = require("../SchemaModels/chat.model");

module.exports.AccessChat = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return next(
        createError.BadRequest("userId param not send with the request")
      );
    }

    let isChat = await ChatModel.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users")
      .populate("latestMessage");

    isChat = await UserModel.populate(isChat, {
      path: "latestMessage.sender",
      select: "name profile email",
    });

    let ChatData = {};
    if (isChat.length > 0) {
      res.status(200).json(isChat);
    } else {
      ChatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createChat = await ChatModel.create(ChatData);

      const FullChat = await ChatModel.findById(createChat._id).populate(
        "users"
      );

      res.status(200).json({
        success: true,
        FullChat,
      });
    }
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

module.exports.fetchChatController = async (req, res, next) => {
  try {
    const data = await ChatModel.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users")
      .populate("groupAdmin")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    const results = await UserModel.populate(data, {
      path: "latestMessage.sender",
      select: "name profile email",
    });

    res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

module.exports.createGroupChatController = async (req, res, next) => {
  try {
    if (!req.body.users || !req.body.name) {
      return next(createError.BadRequest("please fill all the fields"));
    }
    const users = JSON.parse(req.body.users);

    if (users.length < 2) {
      return next(
        createError.BadRequest(
          "More Than 2 users are required to form a group chat"
        )
      );
    }

    users.push(req.user._id);

    const groupChat = await ChatModel.create({
      chatName: req.body.name,
      users,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });

    const fullGroupChat = await ChatModel.findById(groupChat._id)
      .populate("users")
      .populate("groupAdmin");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

module.exports.RenameGroupController = async (req, res, next) => {
  try {
    const { chatId, chatName } = req.body;
    const updatedChat = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        chatName,
      },
      {
        new: true,
      }
    )
      .populate("users")
      .populate("groupAdmin");

    if (!updatedChat) {
      return next(createError.BadRequest("Group not found"));
    }

    res.status(200).json({
      success: true,
      updatedChat,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

module.exports.AddUserinGroupController = async (req, res, next) => {
  try {
    const { chatId, userId } = req.body;

    const added = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
      .populate("users")
      .populate("groupAdmin");

    if (!added) {
      return next(createError.BadRequest("group not found"));
    }

    res.status(200).json({
      success: true,
      added,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

module.exports.RemoveUserinGroupController = async (req, res, next) => {
  try {
    const { chatId, userId } = req.body;

    const removed = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users")
      .populate("groupAdmin");

    if (!removed) {
      return next(createError.BadRequest("group not found"));
    }

    res.status(200).json({
      success: true,
      removed,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};
