import { Schema } from "mongoose";

const imageSchema = new Schema({
  name: String,
  url: String,
  createAt: { type: Date, default: Date.now },
});
export default imageSchema;
