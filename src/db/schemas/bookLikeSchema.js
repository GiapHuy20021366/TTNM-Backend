import { Schema } from "mongoose";

const bookLikeSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String,
    default: Date.now,
  },
});
export default bookLikeSchema;
