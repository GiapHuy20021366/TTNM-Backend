import { Schema } from "mongoose";

const imageSchema = new Schema({
  _id: Schema.Types.ObjectId,
  url: String,
  createAt: { type: Date, default: Date.now },
});
export default imageSchema;
