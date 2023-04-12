import mongoose from "mongoose";
import { userSchema, bookSchema, authorSchema } from "../schemas/index";
import { collections } from "../../constant";

const User = mongoose.model("User", userSchema, collections.user);
const Book = mongoose.model("Book", bookSchema, collections.book);
const Author = mongoose.model("Author", authorSchema, collections.author);

module.exports = {
  User,
  Book,
  Author,
};
