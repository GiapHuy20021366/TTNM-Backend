import { Schema } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    index: true,
  },
  content: String,
  intro: String,
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
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
});
export default bookSchema;
