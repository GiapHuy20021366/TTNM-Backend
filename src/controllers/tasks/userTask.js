import { userService } from "../../services/core";
import { bcryptService } from "../../services/utils";

const createNewUser = async (req, res) => {
  const user = req.body;
  if (user.role) {
    delete user.role;
  }
  const newUser = await userService.createNewUser(user);
  if (!newUser) {
    return res.status(500).json({
      status: 500,
      err: "Internal Server Error",
    });
  }
  const resUser = {
    ...newUser._doc,
  };
  delete resUser.password;
  const token = userService.generateToken(resUser);
  return res.status(200).json({
    data: resUser,
    token,
    status: 200,
  });
};

const getInfOfUser = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      status: 400,
      err: "No id found",
    });
  }
  const userFound = await userService.findUserById(id);
  if (!userFound) {
    return res.status(400).json({
      status: 400,
      err: `No user with id ${id} found`,
    });
  }
  const resUser = {
    ...userFound._doc,
  };
  delete resUser.password;
  return res.status(200).json({
    data: resUser,
    status: 200,
  });
};

const loginUser = async (req, res) => {
  const user = req.body;
  const { email, password } = user;
  const userFound = await userService.findUserByEmail(email);
  if (!userFound) {
    return res.status(400).json({
      status: 400,
      err: `No user with email ${email} found`,
    });
  }
  const resUser = {
    ...userFound._doc,
  };
  // Check is password incorrect
  const matchPass = await bcryptService.compare(password, resUser.password);
  if (!matchPass) {
    return res.status(400).json({
      status: 400,
      err: "Password incorrect",
    });
  }
  delete resUser.password;
  const token = userService.generateToken(resUser);
  return res.status(200).json({
    data: resUser,
    token,
    status: 200,
  });
};

const getAllUsers = async (req, res) => {
  const usersDB = await userService.findAllUsers();
  if (!usersDB) {
    return res.status(500).json({
      status: 500,
      err: "Internal server error",
    });
  }
  return res.status(200).json({
    status: 200,
    data: usersDB,
  });
};

const updateUser = async (req, res) => {
  const userDB = req.middlewareStorage.userGetter;
  if (!userDB) {
    return res.status(500).json({
      status: 500,
      err: "Internal server error",
    });
  }
  const fields = ["username", "email", "avatar"];
  const user = req.body;
  const replacer = {};
  fields.forEach((field) => {
    if (user[field]) {
      replacer[field] = user[field];
    }
  });
  if (user.password) {
    replacer.password = await bcryptService.hash(user.password);
  }
  const newUserDB = await userService.updateUser(userDB, replacer);
  if (!newUserDB) {
    return res.status(500).json({
      status: 500,
      err: "Internal server error",
    });
  }
  if (newUserDB.password) {
    delete newUserDB.password;
  }
  return res.status(200).json({
    data: newUserDB,
    status: 200,
    token: userService.generateToken(newUserDB),
  });
};

module.exports = {
  createNewUser,
  getInfOfUser,
  loginUser,
  getAllUsers,
  updateUser,
};
