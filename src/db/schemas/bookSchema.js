import { Schema } from "mongoose";

const bookSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    index: true,
  },
  context: String,
  date: Date,
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
