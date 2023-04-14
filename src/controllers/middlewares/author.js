import { authorService } from "../../services/core";

const authorCheckerForCreate = async (req, res, next) => {
  const { name, alias } = req.body;
  if (!name) {
    return res.status(400).json({
      status: 400,
      err: "No name found in request",
    });
  }
  if (!alias) {
    return res.status(400).json({
      status: 400,
      err: "No alias found in request",
    });
  }
  const aliasExisted = await authorService.findAuthorByAlias(alias);
  if (aliasExisted) {
    return res.status(400).json({
      status: 400,
      err: "Alias existed, please using another alias",
    });
  }
  next();
};

module.exports = {
  authorCheckerForCreate,
};
