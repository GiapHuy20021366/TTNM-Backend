import { Schema } from "mongoose";

const gameSentenceSchema = new Schema({
  sentence: String,
  date: {
    type: String,
    default: Date.now,
  },
});

export default gameSentenceSchema;
