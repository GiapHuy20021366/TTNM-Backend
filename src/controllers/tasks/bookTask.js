import { bookService, authorService } from "../../services/core";

const uploadBook = async (req, res) => {
  const { title, content, images, intro } = req.body;
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
    images,
    intro,
  };
  // Create book
  const bookDB = await bookService.createBook(book);

  if (!bookDB) {
    return res.status(500).json({
      status: 500,
      err: "Internal server error",
    });
  }

  return res.status(200).json({
    data: bookDB,
    status: 200,
  });
};

const getAllBooks = async (req, res) => {
  const query = req.query;
  const { page, limit } = query;
  if (page) {
    query.page = parseInt(page);
  }
  if (limit) {
    query.limit = parseInt(limit);
  }
  // const books = await bookService.findAllBooks();
  const books = await bookService.findBookByQuery(query);
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
    data: "Delete success",
    status: 200,
  });
};

const updateBook = async (req, res) => {
  const { title, content, intro, images } = req.body;
  const authorsDB = req?.middlewareStorage?.authorParser?.existed;
  const bookDB = req?.middlewareStorage?.bookGetter;
  let authorIDs = [];

  authorsDB &&
    authorsDB.forEach((author) => {
      authorIDs.push(author._id);
    });

  // is replace title?
  const replacer = {
    title,
    content,
    images,
    authors: authorIDs.length > 0 ? authorIDs : null,
    intro,
  };

  // update book
  const updatedBook = await bookService.updateBook(bookDB, replacer);

  if (!updatedBook) {
    return res.status(500).json({
      status: 500,
      err: "Internal server error",
    });
  }

  return res.status(200).json({
    data: updatedBook,
    status: 200,
  });
};

module.exports = {
  uploadBook,
  getAllBooks,
  getOneBook,
  removeOneBook,
  updateBook,
};
