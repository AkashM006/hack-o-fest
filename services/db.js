const Sequelize = require("sequelize");

// const sequelize = new Sequelize("mysql://root:Abcd@1234:3306/sample");
const dbConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DB,
  DIALECT: process.env.DB_DIALECT,
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    return "Established the connection";
  } catch (err) {
    return "Mysql error: " + err;
  }
};

module.exports = { testConnection };
