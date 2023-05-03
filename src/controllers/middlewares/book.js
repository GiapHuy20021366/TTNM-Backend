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

module.exports = {
  bookCheckerForCreate,
  authorParser,
  authorCreatorIfNotExist,
  bookGetterForUpdate,
};
