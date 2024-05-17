const { default: mongoose } = require("mongoose");

const dbconect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    if (conn.connection.readyState === 1)
      console.log("DB connection successfully!");
    else console.log("DB connectio is failed!");
  } catch (error) {
    console.log("DB connectio is failed!");
    throw new Error(error);
  }
};
module.exports = dbconect;
