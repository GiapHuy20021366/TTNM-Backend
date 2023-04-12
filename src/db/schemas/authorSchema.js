import { Schema } from "mongoose";

const authorSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    index: true,
  },
  birth: Date,
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
});
export default authorSchema;
