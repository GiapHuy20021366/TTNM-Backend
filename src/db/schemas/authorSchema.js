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
  birth: Date,
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
      default: [],
    },
  ],
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
      default: [],
    },
  ],
});
export default authorSchema;
