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
});
export default authorSchema;
