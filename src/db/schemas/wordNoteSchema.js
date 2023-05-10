import { Schema } from "mongoose";

const wordNoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  word: String,
  note: String,
  date: {
    type: String,
    default: Date.now,
  },
});
export default wordNoteSchema;
