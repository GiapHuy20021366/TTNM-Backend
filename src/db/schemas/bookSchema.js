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
  views: Number,
  likes: Number,
});
export default bookSchema;
