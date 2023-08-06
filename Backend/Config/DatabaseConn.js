const mongoose = require("mongoose");

// TODO : function for database connection
const DataBaseConn = async () => {
  try {
    await mongoose.connect(process.env.DatabaseConnectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database is connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = DataBaseConn;
