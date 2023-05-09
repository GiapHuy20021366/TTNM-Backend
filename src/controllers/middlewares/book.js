import { authorService, bookService } from "../../services/core";

const bookCheckerForCreate = (req, res, next) => {
  const { title, content } = req.body;
  if (!title) {
    return res.status(400).json({
      status: 400,
      err: "Title can not empty",
    });
  }
  if (!content) {
    return res.status(400).json({
      status: 400,
      err: "Content can not empty",
    });
  }

  next();
};

const bookGetterForUpdate = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: 400,
      err: "No id found in request",
    });
  }

  const bookDB = await bookService.findBookById(id);
  if (!bookDB) {
    return res.status(404).json({
      status: 404,
      err: `No book with id ${id} found`,
    });
  }

  req.middlewareStorage.bookGetter = bookDB;
  next();
};

const authorParser = async (req, res, next) => {
  const { authors } = req.body;
  const authorParser = {
    existed: [],
    notExisted: [],
  };
  req.middlewareStorage.authorParser = authorParser;
  if (authors && authors.length > 0) {
    const isAllValid = authors.every((author) => {
      const { id, name, alias } = author;
      return id || alias || (name && alias);
    });

    if (!isAllValid) {
      return res.status(400).json({
        status: 400,
        err: `Each author should contain id or alias or (name and alias)`,
      });
    }

    await Promise.all(
      authors.map(async (author) => {
        const { id, name, alias } = author;
        if (id) {
          const authorDB = await authorService.findAuthorById(id);
          if (authorDB) {
            authorParser.existed.push(authorDB);
          }
          return;
        }
        if (alias) {
          const authorDB = await authorService.findAuthorByAlias(alias);
          if (authorDB) {
            authorParser.existed.push(authorDB);
            return;
          }
        }
        authorParser.notExisted.push(author);
      })
    );
  }
  next();
};

const authorCreatorIfNotExist = async (req, res, next) => {
  const notExisted = req?.middlewareStorage?.authorParser?.notExisted;
  if (notExisted && notExisted.length > 0) {
    await Promise.all(
      notExisted.map(async (author) => {
        const authorDB = await authorService.createNewAuthor(author);
        if (authorDB) {
          req.middlewareStorage.authorParser.existed.push(authorDB);
        }
      })
    );
  }
  next();
};

const bookLikeChecker = async (req, res, next) => {
  const bookId = req?.params?.id;
  if (!bookId) {
    return res.status(400).json({
      err: "No book id found in request",
      status: 400,
    });
  }
  const auth = req?.middlewareStorage?.authorization;
  if (!auth?.role) {
    return res.status(500).json({
      status: 500,
      err: "Internal server error. Invalid Token cause by login method",
    });
  }
  const userId = auth._id;
  const bookDB = await bookService.findBookById(bookId);
  if (!bookDB) {
    return res.status(404).json({
      err: `No book with id ${bookId} found`,
      status: 404,
    });
  }
  const bookLike = await bookService.getBookLike(bookId, userId);
  if (bookLike) {
    return res.status(400).json({
      err: "Already liked",
      status: 400,
    });
  }

  const bookLikeDB = await bookService.likeBook(bookDB, userId);
  if (!bookLikeDB) {
    return res.status(500).json({
      err: "Internal server error",
      status: 500,
    });
  }

  req.middlewareStorage.bookLike = bookLikeDB;
  next();
};

const bookUnlikeChecker = async (req, res, next) => {
  const bookId = req?.params?.id;
  if (!bookId) {
    return res.status(400).json({
      err: "No book id found in request",
      status: 400,
    });
  }
  const auth = req?.middlewareStorage?.authorization;
  if (!auth?.role) {
    return res.status(500).json({
      status: 500,
      err: "Internal server error. Invalid Token cause by login method",
    });
  }
  const userId = auth._id;
  const bookDB = await bookService.findBookById(bookId);
  if (!bookDB) {
    return res.status(404).json({
      err: `No book with id ${bookId} found`,
      status: 404,
    });
  }
  const bookLike = await bookService.getBookLike(bookId, userId);
  if (!bookLike) {
    return res.status(400).json({
      err: "Not like yet",
      status: 400,
    });
  }

  const deleteBookLike = await bookService.deleteBookLike(bookDB, bookLike);
  if (!deleteBookLike) {
    return res.status(500).json({
      err: "Internal server error",
      status: 500,
    });
  }

  return res.status(200).json({
    data: {},
    status: 200,
  });
};

const bookLikeCheckerForGet = async (req, res, next) => {
  const bookId = req?.params?.id;
  if (!bookId) {
    return res.status(400).json({
      err: "No book id found in request",
      status: 400,
    });
  }
  const auth = req?.middlewareStorage?.authorization;
  if (!auth?.role) {
    return res.status(500).json({
      status: 500,
      err: "Internal server error. Invalid Token cause by login method",
    });
  }
  const userId = auth._id;
  const bookDB = await bookService.findBookById(bookId);
  if (!bookDB) {
    return res.status(404).json({
      err: `No book with id ${bookId} found`,
      status: 404,
    });
  }

  req.middlewareStorage.book = { _id: bookId };
  req.middlewareStorage.user = { _id: userId };

  next();
};

module.exports = {
  bookCheckerForCreate,
  authorParser,
  authorCreatorIfNotExist,
  bookGetterForUpdate,
  bookLikeChecker,
  bookUnlikeChecker,
  bookLikeCheckerForGet,
};
