import mongoose from "mongoose";
import { userSchema } from "../schemas/index";
require("dotenv").config();

const User = mongoose.model("User", userSchema, process.env.COLLECTION);

module.exports = {
  User,
};
