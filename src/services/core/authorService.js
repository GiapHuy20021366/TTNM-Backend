import { Author } from "../../db/models";

const getAuthorById = async (id) => {
  try {
    const author = await Author.findById(id).exec();
    return author;
  } catch (error) {
    return null;
  }
};

const getAuthorByAlias = async (alias) => {
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

module.exports = {
  getAuthorById,
  getAuthorByAlias,
  createNewAuthor,
};
