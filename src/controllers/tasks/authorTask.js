import { authorService } from "../../services/core";

const createNewAuthor = async (req, res) => {
  const author = req.body;
  const authorDB = await authorService.createNewAuthor(author);
  if (!authorDB) {
    return res.status(500).json({
      status: 500,
      err: "Internal server error",
    });
  }
  return res.status(200).json({
    data: authorDB,
    status: 200,
  });
};

const getAllAuthors = async (req, res) => {
  const authors = await authorService.findAllAuthors();
  if (!authors) {
    return res.status(500).json({
      status: 500,
      err: "Internal server error",
    });
  }
  return res.status(200).json({
    data: authors,
    status: 200,
  });
};

const getOneAuthor = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: 400,
      err: "No author id found in request",
    });
  }
  const author = await authorService.findAuthorById(id);
  if (!author) {
    return res.status(404).json({
      status: 404,
      err: `No author with id ${id} found`,
    });
  }
  return res.status(200).json({
    data: author,
    status: 200,
  });
};

module.exports = {
  createNewAuthor,
  getAllAuthors,
  getOneAuthor,
};
