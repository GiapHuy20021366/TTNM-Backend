require("dotenv").config();

export const collections = {
  user: process.env.USER_COLLECTION || "users",
  book: process.env.BOOK_COLLECTION || "books",
  author: process.env.AUTHOR_COLLECTION || "authors",
  image: process.env.IMAGE_COLLECTION || "images",
};
