import { Schema } from "mongoose";

const bookSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    index: true,
  },
  content: String,
  uploadDate: {
    type: String,
    default: Date.now,
  },
  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
  ],
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  views: Number,
  likes: Number,
});
export default bookSchema;
