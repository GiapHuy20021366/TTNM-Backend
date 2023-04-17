import { Schema } from "mongoose";

const imageSchema = new Schema({
  name: String,
  url: String,
  hash: {
    type: String,
    index: true,
  },
  createAt: { type: Date, default: Date.now },
});
export default imageSchema;
