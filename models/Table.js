   const { DataTypes, Sequelize } = require("sequelize")
const sequelize = require("../database/config")
const { v4: uuidv4 } = require('uuid');

   
  const Table = sequelize.define('daftar_tables', {
    id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  nama_table: {
        type: DataTypes.STRING,
    allowNull: false
  },
  id_table: {
        type: DataTypes.INTEGER,
    allowNull: false
  },

  
 
});

Table.beforeCreate((table, options) => {
  table.id = uuidv4(); // set uuid for id field
});
module.exports = Table