import { bookService, authorService } from "../../services/core";
import { vntkService } from "../../services/utils";

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
    // await Promise.all(books.map( async (bookDB) => {

    // }))
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
  const auth = req?.middlewareStorage?.authorization;
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
  await bookService.increaseBookView(book);
  if (auth) {
    const withLike = await bookService.coverWithLikeInf(book, auth._id);
    // console.log(withLike);
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

const likeOneBook = async (req, res) => {
  const bookLikeDB = req?.middlewareStorage?.bookLike;
  if (!bookLikeDB) {
    return res.status(500).json({
      err: "Internal server error",
      status: 500,
    });
  }
  return res.status(200).json({
    data: bookLikeDB,
    status: 200,
  });
};

const unlikeOneBook = async (req, res) => {
  return res.status(200).json({
    data: {},
    status: 200,
  });
};

const getLikesOfBook = async (req, res) => {
  const bookId = req.middlewareStorage.book._id;
  const likes = await bookService.getLikesOfBook(bookId);
  if (!likes) {
    return res.status(500).json({
      err: "Internal server error",
      status: 500,
    });
  }
  return res.status(200).json({
    data: likes,
    status: 200,
  });
};

const getSentencesOfBook = async (req, res) => {
  const { id } = req?.params;
  const query = req.query || {};
  let { page, limit } = query;
  page = (page && +page) || 0;
  limit = (limit && +limit) || 30;
  page = page < 0 ? -page : page;
  limit = limit < 0 ? -limit : limit;
  // console.log(page, limit);

  const auth = req?.middlewareStorage?.authorization;
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
  if (page === 0) {
    await bookService.increaseBookView(book);
  }

  if (auth) {
    const withLike = await bookService.coverWithLikeInf(book, auth._id);
    // console.log(withLike);
  }

  const sentences = book.content.split(".");
  const maxPage = Math.floor(sentences.length / limit);
  let startIndex = page * limit;
  let endIndex = startIndex + limit - 1;
  if (endIndex >= sentences.length) {
    endIndex = sentences.length - 1;
    page = maxPage;
  }
  if (startIndex >= sentences.length) {
    startIndex = endIndex - limit + 1;
    page = maxPage;
    if (startIndex < 0) {
      startIndex = 0;
    }
  }
  const filterSentences = sentences.filter((sentence, index) => {
    return index >= startIndex && index <= endIndex;
  });

  const tokens = filterSentences.map((sentence, index) => {
    let cvtSentence = sentence.trim().replaceAll("\\n", " break ") + ".";
    cvtSentence = cvtSentence.replaceAll("\n", " break ");

    const originSentence = cvtSentence.replaceAll(" break ", "");
    const dx = {
      _id: index + startIndex,
      sentence: originSentence,
      tokens: vntkService.tokenize(cvtSentence),
    };
    return dx;
  });
  book._doc.sentences = tokens;
  book._doc.currentPage = page;
  book._doc.maxPage = maxPage;
  delete book._doc.content;
  return res.status(200).json({
    data: book,
    status: 200,
  });
};

const getSentencesOfBookByStream = async (req, res) => {
  const { id } = req?.params;
  const auth = req?.middlewareStorage?.authorization;
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
  await bookService.increaseBookView(book);
  if (auth) {
    const withLike = await bookService.coverWithLikeInf(book, auth._id);
    // console.log(withLike);
  }
  const sentences = book.content.split(".");
  delete book._doc.content;
  // Stream....
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");

  res.write("data: " + JSON.stringify(book) + "\n\n");

  const t2 = Date.now();
  let index = 0;
  for (const sentence of sentences) {
    const cvtSentence = sentence.trim().replaceAll("\\n", " break ") + ".";
    const originSentence = cvtSentence.replaceAll(" break ", "");
    const dx = {
      _id: index,
      sentence: originSentence,
      tokens: vntkService.tokenize(cvtSentence),
    };
    // res.write("data: " + index + "\n\n");
    index += 1;
    res.write("data: " + JSON.stringify(dx) + "\n\n");
  }

  res.end();
};

module.exports = {
  uploadBook,
  getAllBooks,
  getOneBook,
  removeOneBook,
  updateBook,
  likeOneBook,
  unlikeOneBook,
  getLikesOfBook,
  getSentencesOfBook,
  getSentencesOfBookByStream,
};
