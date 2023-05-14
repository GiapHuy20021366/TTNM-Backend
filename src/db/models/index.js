import mongoose from "mongoose";
import {
  userSchema,
  bookSchema,
  authorSchema,
  imageSchema,
  bookLikeSchema,
  feedbackSchema,
  wordNoteSchema,
  gameSentenceSchema,
  sortGameHistorySchema,
  choiceGameHistorySchema,
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
const Feedback = mongoose.model(
  "Feedback",
  feedbackSchema,
  collections.feedback
);
const WordNote = mongoose.model(
  "WordNote",
  wordNoteSchema,
  collections.wordNote
);
const GameSentence = mongoose.model(
  "GameSentence",
  gameSentenceSchema,
  collections.gameSentence
);

const SortGameHistory = mongoose.model(
  "SortGameHistory",
  sortGameHistorySchema,
  collections.sortGameHistory
);

const ChoiceGameHistory = mongoose.model(
  "ChoiceGameHistory",
  choiceGameHistorySchema,
  collections.choiceGameHistory
);

module.exports = {
  User,
  Book,
  Author,
  Image,
  BookLike,
  Feedback,
  WordNote,
  GameSentence,
  SortGameHistory,
  ChoiceGameHistory,
};
