import initAdmins from "./initAdmins";
import initSentences from "./initSentences";

const migrate = async () => {
  console.log("=========> Migrating <+++++++++++");
  await initAdmins();
  await initSentences();
  console.log("=========> Migrated <+++++++++++");
};

module.exports = migrate;
