import { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
  },
  password: String,
  email: {
    type: String,
    index: true,
  },
  avatar: String,
  role: String,
  createAt: { type: Date, default: Date.now },
});
export default userSchema;
