import { bookService, authorService } from "../../services/core";

const uploadBook = async (req, res) => {
  const { title, content, images } = req.body;
  const authorsDB = req?.middlewareStorage?.authorParser?.existed;
  const authorIDs = [];

  authorsDB &&
    authorsDB.forEach((author) => {
      authorIDs.push(author._id);
    });
  const book = {
    title,
    content,
    authors: authorIDs,
  };
  // Create book
  const bookDB = await bookService.createBook(book);

  if (!bookDB) {
    return res.status(500).send("Internal server error");
  }
  // Add ref to book
  await authorService.addBookRef(bookDB);

  return res.status(200).json({
    data: bookDB,
  });
  //   return res.status(200).send("This feature is implementing...");
};

const getAllBooks = async (req, res) => {
  const books = await bookService.findAllBooks();
  if (books) {
    return res.status(200).json({
      data: books,
    });
  }
  return res.status(500).send("Internal server error");
};

const getOneBook = async (req, res) => {
  const { id } = req?.params;
  if (!id) {
    return res.status(400).send("No book id found in request");
  }
  const book = await bookService.findBookById(id);
  if (!book) {
    return res.status(404).send(`No book with id ${id}found`);
  }
  return res.status(200).json(book);
};

const removeOneBook = async (req, res) => {
  const { id } = req?.params;
  if (!id) {
    return res.status(400).send("No book id found in request");
  }
  const bookDB = await bookService.removeBookById(id);
  if (!bookDB) {
    return res.status(404).send(`No book with id ${id} found`);
  }
  // Remove books on author side
  await authorService.removeBookRef(bookDB);
  return res.status(200).json(bookDB);
};

module.exports = {
  uploadBook,
  getAllBooks,
  getOneBook,
  removeOneBook,
};
