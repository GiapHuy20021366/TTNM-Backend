import { Schema } from "mongoose";

const imageSchema = new Schema({
  _id: Schema.Types.ObjectId,
  base64: String,
  createAt: { type: Date, default: Date.now },
});
export default imageSchema;
