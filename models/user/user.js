const { Sequelize, adminDB } = require(ROOT_DIR + "/db.js");

const User = adminDB.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password_hash: {
    type: Sequelize.STRING,
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
  role: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  session: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
},
{
  timestamps: true,
  updatedAt: true,
});

module.exports = User;