import fs from "fs";
import path from "path";
const jwt = require("jsonwebtoken");

const jwtPrivateKey = fs.readFileSync(
  path.resolve(__dirname, "../../RSA/jwt-private-key.pem")
);

const signToken = (data, expiresIn = "1h") => {
  return jwt.sign(data, jwtPrivateKey, {
    expiresIn,
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtPrivateKey);
  } catch (error) {
    return null;
  }
};

module.exports = {
  signToken,
  verifyToken,
};
