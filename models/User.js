const bcrypt = require('bcrypt');
   const { DataTypes, Sequelize } = require("sequelize")
const sequelize = require("../database/config");
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('users',{
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;