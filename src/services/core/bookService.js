import { Book } from "../../db/models";

const createBook = async (book) => {
  const bookDB = new Book(book);
  try {
    await bookDB.save();
    return bookDB;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const findAllBooks = async (select = "-content") => {
  try {
    const books = await Book.find().select(select).populate("authors").exec();
    return books;
  } catch (error) {
    return null;
  }
};

const findBookById = async (id) => {
  try {
    const book = await Book.findById(id).exec();
    return book;
  } catch (error) {
    return null;
  }
};

const removeBookById = async (id) => {
  try {
    const deletedBook = await Book.findByIdAndRemove(id)
      .select("-content")
      .exec();
    return deletedBook;
  } catch (error) {
    return null;
  }
};

const updateBook = async (bookDB, replacer) => {
  Object.keys(replacer).forEach((key) => {
    if (replacer[key]) {
      bookDB[key] = replacer[key];
    }
  });
  try {
    await bookDB.save();
    return bookDB;
  } catch (error) {
    return null;
  }
};

module.exports = {
  createBook,
  findAllBooks,
  findBookById,
  removeBookById,
  updateBook,
};
