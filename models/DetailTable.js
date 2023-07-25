   const { DataTypes, Sequelize } = require("sequelize")
   const sequelize = require("../database/config")
   const { v4: uuidv4 } = require('uuid');

   const DetailTable = sequelize.define('detail_tables', {
    id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
     id_daftar_table: {
        type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  nama: {
        type: DataTypes.STRING,
    allowNull: false
  },
   status_api: {
        type: DataTypes.STRING,
    allowNull: false
  }
});

DetailTable.beforeCreate((detailtable, options) => {
  detailtable.id = uuidv4(); // set uuid for id field
});

module.exports = DetailTable