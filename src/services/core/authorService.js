import { Author } from "../../db/models";

const findAuthorById = async (id) => {
  try {
    const author = await Author.findById(id).exec();
    return author;
  } catch (error) {
    return null;
  }
};

const findAuthorByAlias = async (alias) => {
  try {
    const author = await Author.findOne({ alias }).exec();
    return author;
  } catch (error) {
    return null;
  }
};

const createNewAuthor = async (author) => {
  try {
    const authorDB = new Author(author);
    await authorDB.save();
    return authorDB;
  } catch (error) {
    return null;
  }
};

const removeBookRef = async (bookDB) => {
  const authorIDs = bookDB.authors;
  if (authorIDs) {
    await Promise.all(
      authorIDs.map(async (authorID) => {
        await Author.updateOne(
          { _id: authorID },
          {
            $pull: {
              books: bookDB._id,
            },
          }
        );
      })
    );
  }
};

const addBookRef = async (bookDB) => {
  const authorIDs = bookDB.authors;
  if (authorIDs) {
    await Promise.all(
      authorIDs.map(async (authorID) => {
        await Author.updateOne(
          { _id: authorID },
          {
            $addToSet: {
              books: bookDB._id,
            },
          }
        );
      })
    );
  }
};

const findAllAuthors = async () => {
  try {
    const authors = await Author.find().exec();
    return authors;
  } catch (error) {
    return null;
  }
};

const findByNameAndAlias = async (string) => {
  try {
    const authors = await Author.find({
      $or: [
        { name: { $regex: string, $options: "i" } },
        { alias: { $regex: string, $options: "i" } },
      ],
    }).exec();
    return authors;
  } catch (error) {
    return null;
  }
};

module.exports = {
  findAuthorById,
  findAuthorByAlias,
  createNewAuthor,
  addBookRef,
  removeBookRef,
  findAllAuthors,
  findByNameAndAlias,
};
