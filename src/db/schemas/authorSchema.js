import { Schema } from "mongoose";

const authorSchema = new Schema({
  name: {
    type: String,
    index: true,
  },
  alias: {
    type: String,
    index: true,
    unique: true,
  },
  intro: String,
  birth: Date,
  avatar: String,
});
export default authorSchema;
