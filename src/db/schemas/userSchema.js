import { Schema } from "mongoose";
import { Role } from "../../constant";

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true,
  },
  password: String,
  email: {
    type: String,
    index: true,
    unique: true,
  },
  role: {
    type: String,
    default: Role.USER,
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  createAt: { type: Date, default: Date.now },
});
export default userSchema;
