import authorService from "./authorService";
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

const concatBookQuery = (currentQuery, query) => {
  let bookQuery = currentQuery;

  let { limit, page, sort, desc } = query;
  if (limit && limit < 0) {
    limit = 0;
  }
  if (page && page < 0) {
    page = 0;
  }
  if (!desc || desc <= 0 || desc === "false") {
    desc = -1;
  }

  const pagination = limit && page;
  let field = ["likes", "views", "uploadDate"].find(
    (field) => sort && sort === field
  );
  if (pagination && field) {
    bookQuery = bookQuery.limit(limit * 1).skip((page - 1) * limit);
  }
  if (field) {
    bookQuery = bookQuery.sort({
      [field]: desc,
    });
  }

  return bookQuery;
};

const isNotQuery = (query, keys = []) => {
  return !query || Object.keys(query).every((key) => !keys.includes(key));
};

const findBookByQuery = async (query) => {
  const isQuery = !isNotQuery(query, [
    "limit",
    "page",
    "sort",
    "desc",
    "book",
    "author",
  ]);

  if (!isQuery) {
    const books = await findAllBooks();
    return books;
  }

  let queryDB = Book;
  let { book: bookName, author: authorName } = query;

  let authors;
  if (authorName && typeof authorName === "string") {
    authors = await authorService.findByNameAndAlias(authorName);
  }

  const arrQuery = [];
  authors &&
    authors.length > 0 &&
    arrQuery.push({
      authors: {
        $in: authors.map((author) => author._id.toString()),
      },
    });

  if (authors && authors.length === 0) {
    return [];
  }

  bookName &&
    typeof bookName === "string" &&
    arrQuery.push({
      title: {
        $regex: bookName,
      },
    });

  if (arrQuery.length > 0) {
    queryDB = queryDB.find({
      $and: arrQuery,
    });
  } else {
    queryDB = queryDB.find();
  }

  queryDB = queryDB.populate("authors");

  queryDB = concatBookQuery(queryDB, query);

  try {
    const booksDB = await queryDB.exec();
    return booksDB;
  } catch (error) {
    console.log(error);
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
  findBookByQuery,
};
