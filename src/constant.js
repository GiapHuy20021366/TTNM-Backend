require("dotenv").config();

export const collections = {
  user: process.env.USER_COLLECTION || "users",
  book: process.env.BOOK_COLLECTION || "books",
  author: process.env.AUTHOR_COLLECTION || "authors",
  image: process.env.IMAGE_COLLECTION || "images",
  bookLike: process.env.BOOK_LIKE_COLLECTION || "book-likes",
  feedback: process.env.FEEDBACK_COLLECTION || "feedbacks",
  wordNote: process.env.WORD_NOTE_COLLECTION || "word-notes",
  gameSentence: process.env.GAME_SENTENCE_COLLECTION || "game-sentences",
  sortGameHistory:
    process.env.SORT_GAME_HISTORY_COLLECTIOn || "sort-game-histories",
};

export class Method {
  static POST = "post";
  static GET = "get";
  static DELETE = "delete";
  static UPDATE = "update";
  static PUT = "put";
}

export class Role {
  static USER = "user";
  static ADMIN = "admin";
  static ANY = "any";
}

export const roleLevels = {
  [Role.ADMIN]: 100,
  [Role.USER]: 0,
  [Role.ANY]: -100,
};
