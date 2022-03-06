const brcypt = require("bcrypt");

const genHash = (password) => {
  const saltRounds = Number(process.env.SALT_ROUNDS);
  return brcypt.hash(password, saltRounds);
};

const checkPassword = (password, hash) => {
  return brcypt.compare(password, hash);
};

module.exports = { checkPassword, genHash };
