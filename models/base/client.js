const { Sequelize, adminDB} = require(ROOT_DIR + "/db");


const Client = adminDB.define("client", {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  projects: {
    type: Sequelize.STRING,
    allowNull: true
  },
  contacts: {
    type: Sequelize.STRING,
    allowNull: true
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  comment:{
    type: Sequelize.STRING,
    allowNull: true
  }
},{
  timestamp: true,
  updatedAt: true
});

module.exports = Client;