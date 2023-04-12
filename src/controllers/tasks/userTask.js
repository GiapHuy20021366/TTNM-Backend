import { userService } from "../../services/core";
import { jwtService, bcryptService } from "../../services/utils";

const createNewUser = async (req, res) => {
  const user = req.body;
  const newUser = await userService.createNewUser(user);
  if (!newUser) {
    return res.status(500).send("Internal Server Error");
  }
  const resUser = {
    ...newUser._doc,
  };
  delete resUser.password;
  const token = jwtService.signToken(resUser);
  return res.status(200).json({
    data: resUser,
    token,
  });
};

const getInfOfUser = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send("No id found");
  }
  const userFound = await userService.findUserById(id);
  if (!userFound) {
    return res.status(400).send(`No user with id ${id} found`);
  }
  const resUser = {
    ...userFound._doc,
  };
  delete resUser.password;
  return res.status(200).json({
    data: resUser,
  });
};

const loginUser = async (req, res) => {
  const user = req.body;
  const { email, password } = user;
  const userFound = await userService.findUserByEmail(email);
  if (!userFound) {
    return res.status(400).send(`No user with email ${email} found`);
  }
  const resUser = {
    ...userFound._doc,
  };
  // Check is password incorrect
  const matchPass = await bcryptService.compare(password, resUser.password);
  if (!matchPass) {
    return res.status(400).send("Password incorrect");
  }
  delete resUser.password;
  const token = jwtService.signToken(resUser);
  return res.status(200).json({
    data: resUser,
    token,
  });
};

module.exports = {
  createNewUser,
  getInfOfUser,
  loginUser,
};
