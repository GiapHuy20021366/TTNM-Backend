import { Schema } from "mongoose";

const sortGameHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  sentence: {
    type: Schema.Types.ObjectId,
    ref: "GameSentence",
  },
  correct: Boolean,
  date: {
    type: String,
    default: Date.now,
  },
});
export default sortGameHistorySchema;
