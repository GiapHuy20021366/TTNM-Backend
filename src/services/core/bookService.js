import { Book } from "../../db/models";

const createBook = async (book, authorsDB = []) => {
  const bookDB = new Book(book);
  try {
    await bookDB.save();
    if (authorsDB) {
      await Promise.all(
        authorsDB.map(async (author) => {
          author.books.push(bookDB._id);
          await author.save();
        })
      );
    }
    return bookDB;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const findAllBooks = async (select = "-content") => {
  try {
    const books = await Book.find().select(select).exec();
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

module.exports = {
  createBook,
  findAllBooks,
  findBookById,
};
