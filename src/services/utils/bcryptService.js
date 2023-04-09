const bcrypt = require("bcrypt");
const saltRounds = 10;

const hash = async (password) => {
  return new Promise(async (resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (hash) {
        resolve(hash);
      }
      if (err) {
        console.log(err);
        reject(null);
      }
    });
  });
};

const compare = async (plainPassword, hash) => {
  return new Promise(async (resolve, reject) => {
    bcrypt.compare(plainPassword, hash, (err, result) => {
      if (result) {
        resolve(true);
      }
      if (err) {
        reject(false);
      }
    });
  });
};

module.exports = {
  hash,
  compare,
};
