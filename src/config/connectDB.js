import mongoose from "mongoose";
require("dotenv").config();

const useURI = () => {
  if (process.env.APP_MODE == "development") {
    return process.env.MONGODB_LOCAL_URI;
  }
  return process.env.MONGODB_CLOUD_URI;
};

const connectDB = async () => {
  mongoose.connect(useURI(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const conn = mongoose.connection;
  conn.on("connected", function () {
    console.log("database is connected successfully");
  });
  conn.on("disconnected", function () {
    console.log("database is disconnected successfully");
  });
  conn.on("error", console.error.bind(console, "connection error:"));
};

export default connectDB;
