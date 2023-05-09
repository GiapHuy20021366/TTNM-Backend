import { Schema } from "mongoose";

const feedbackSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  type: String,
  anonymous: {
    type: Boolean,
    default: true,
  },
  description: String,
  date: {
    type: String,
    default: Date.now,
  },
});
export default feedbackSchema;
