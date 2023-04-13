import { Role } from "../../constant";
import { userService } from "../../services/core";

const administrator = {
  username: "administrator",
  password: "password",
  email: "huygiapboy@gmail.com",
  role: Role.ADMIN,
};

const hungPC = {
  username: "hungPC",
  password: "password",
  email: "hungPC@gmail.com",
  role: Role.ADMIN,
};

const phongTocdo = {
  username: "phongTocdo",
  password: "password",
  email: "phongTocdo@gmail.com",
  role: Role.ADMIN,
};

const quangHuyAlone = {
  username: "quangHuyAlone",
  password: "password",
  email: "quangHuyAlone@gmail.com",
  role: Role.ADMIN,
};

const giapHuyHetXien = {
  username: "giapHuyHetXien",
  password: "password",
  email: "giapHuyHetXien@gmail.com",
  role: Role.ADMIN,
};

const admins = {
  administrator,
  hungPC,
  phongTocdo,
  quangHuyAlone,
  giapHuyHetXien,
};

const initAdmins = () => {
  Promise.all(
    Object.values(admins).map(async (admin) => {
      const adminDB = await userService.findUserByEmail(admin.email);
      if (!adminDB) {
        const newAdmin = await userService.createNewUser(admin);
        console.log("New admin created ", newAdmin);
      }
    })
  ).then(() => {});
};

export default initAdmins;
