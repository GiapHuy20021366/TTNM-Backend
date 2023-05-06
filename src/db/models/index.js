import mongoose from "mongoose";
import {
  userSchema,
  bookSchema,
  authorSchema,
  imageSchema,
  bookLikeSchema,
} from "../schemas";
import { collections } from "../../constant";

const User = mongoose.model("User", userSchema, collections.user);
const Book = mongoose.model("Book", bookSchema, collections.book);
const Author = mongoose.model("Author", authorSchema, collections.author);
const Image = mongoose.model("Image", imageSchema, collections.image);
const BookLike = mongoose.model(
  "BookLike",
  bookLikeSchema,
  collections.bookLike
);

module.exports = {
  User,
  Book,
  Author,
  Image,
  BookLike,
};
