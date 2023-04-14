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
    return res.status(500).json({
      status: 500,
      err: "Internal server error",
    });
  }
  // Add ref to book
  await authorService.addBookRef(bookDB);

  return res.status(200).json({
    data: bookDB,
    status: 200,
  });
  //   return res.status(200).send("This feature is implementing...");
};

const getAllBooks = async (req, res) => {
  const books = await bookService.findAllBooks();
  if (books) {
    return res.status(200).json({
      data: books,
      status: 200,
    });
  }
  return res.status(500).json({
    status: 500,
    err: "Internal server error",
  });
};

const getOneBook = async (req, res) => {
  const { id } = req?.params;
  if (!id) {
    return res.status(400).json({
      status: 400,
      err: "No book id found in request",
    });
  }
  const book = await bookService.findBookById(id);
  if (!book) {
    return res.status(404).json({
      status: 404,
      err: `No book with id ${id} found`,
    });
  }
  return res.status(200).json({
    data: book,
    status: 200,
  });
};

const removeOneBook = async (req, res) => {
  const { id } = req?.params;
  if (!id) {
    return res.status(400).json({
      status: 400,
      err: "No book id found in request",
    });
  }
  const bookDB = await bookService.removeBookById(id);
  if (!bookDB) {
    return res.status(404).json({
      status: 404,
      err: `No book with id ${id} found`,
    });
  }
  // Remove books on author side
  await authorService.removeBookRef(bookDB);
  return res.status(200).json({
    data: bookDB,
    status: 200,
  });
};

module.exports = {
  uploadBook,
  getAllBooks,
  getOneBook,
  removeOneBook,
};
