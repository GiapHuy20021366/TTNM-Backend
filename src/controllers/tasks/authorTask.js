import { authorService } from "../../services/core";

const createNewAuthor = async (req, res) => {
  const author = req.body;
  const authorDB = await authorService.createNewAuthor(author);
  if (!authorDB) {
    return res.status(500).send("Internal server error");
  }
  return res.status(200).json(authorDB);
};

const getAllAuthors = async (req, res) => {
  const authors = await authorService.findAllAuthors();
  if (!authors) {
    return res.status(500).send("Internal server error");
  }
  return res.status(200).json(authors);
};

const getOneAuthor = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("No author id found in request");
  }
  const author = await authorService.findAuthorById(id);
  if (!author) {
    return res.status(404).send(`No author with id ${id} found`);
  }
  return res.status(200).json(author);
};

module.exports = {
  createNewAuthor,
  getAllAuthors,
  getOneAuthor,
};
