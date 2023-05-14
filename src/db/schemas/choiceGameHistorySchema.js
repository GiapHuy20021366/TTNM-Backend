import { Schema } from "mongoose";

const choiceGameHistorySchema = new Schema({
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
export default choiceGameHistorySchema;
