const multer = require("multer");

const storage = multer.diskStorage({});

// TODO : Uploading a single image middleware
const singleUpload = multer({ storage }).single("ProfileAvatar");

module.exports = singleUpload;
