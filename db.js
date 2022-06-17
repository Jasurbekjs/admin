const Sequelize = require("sequelize");

// определяем объект Sequelize
const adminDB = new Sequelize("gbh_admin", "hestiaJas_gbh", "hestiaJas_gbh13", {
  dialect: "mariadb",
  host: "localhost",
  logging: false,
});

module.exports= {
  Sequelize,
  adminDB
};
