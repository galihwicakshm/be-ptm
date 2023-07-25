
const Table = require('../models/Table');
const DetailTable = require("../models/DetailTable")
const db = require("../database/manual");


    exports.tambahTable = async(req, res) => {
    try {
    const { nama_table, id_table} = req.body;
    const table = await Table.create({ 
      nama_table,
      id_table,
    });
    res.status(200).json({
      status: 'success',
      data : table
    });
    } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
    }
  }


    exports.getDaftarTables = async (req,res) => {
    const sql = 'SELECT * FROM daftar_tables ORDER BY createdAt ASC '
    db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
     res.status(200).json({
        data: result
      });
    });
  }

    exports.updateTables = async(req,res) => {
    const { id } = req.params;
    const { nama, status_api} = req.body;
    const table = await Table.findByPk(id);
    if (!table) {
      return res.status(404).json({ error: 'User not found' });
    }
    const tablecreate = await DetailTable.create({ 
        nama,id_daftar_table:id, status_api
      });
    res.json({
      status: "succes",
      data: tablecreate
    });
  }


    exports.getDataTables = async(req,res) => {
    const { id } = req.params;
    const tables = await Table.findByPk(id);

    const sql = 'SELECT detail_tables.id, detail_tables.nama, detail_tables.status_api, daftar_tables.nama_table FROM detail_tables JOIN daftar_tables ON daftar_tables.id = detail_tables.id_daftar_table';
    if (!tables) {
      return res.status(404).json({ error: 'Table not found' });
    }
      db.query(sql, (err, result) => {
      res.status(200).json({
         data: result
      });
    });
   
  }

    exports.getDaftarTablesID = async (req, res) => {
    const { id} = req.params;
    const table = await Table.findOne({ where: { id: id } });
    if (!table) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      status: 'succes',
      data:table
    });
  };


    exports.getJoinTablesID = async (req, res) => {
    
    const { id } = req.params;
    
    const sql = `SELECT detail_tables.id as id_detail, daftar_tables.nama_table, detail_tables.nama, detail_tables.status_api
    FROM daftar_tables
    INNER JOIN detail_tables ON daftar_tables.id=detail_tables.id_daftar_table WHERE detail_tables.id_daftar_table = '${id}' ORDER BY detail_tables.createdAt ASC;`;


    const table = await Table.findOne({ where: { id: id } });
    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }
    db.query(sql, (err, result) => {
    res.status(200).json({
        data: result,
        });
      });
  };


    exports.getJoinTables = async (req, res) => {
    const sql = `SELECT daftar_tables.nama_table, detail_tables.id,detail_tables.id_daftar_table,detail_tables.nama, detail_tables.status_api,  detail_tables.createdAt
    FROM daftar_tables
    INNER JOIN detail_tables ON daftar_tables.id=detail_tables.id_daftar_table ORDER BY detail_tables.createdAt ASC`;
    const table = await Table.findAll();
    if (!table) {
      return res.status(404).json({ error: 'User not found' });
    }
    db.query(sql, (err, result) => {
    res.status(200).json({
    data:  result
        });
    });  
  };

    
    exports.getAllTables= async (req, res) => {
    const sql = `SELECT detail_tables.id,detail_tables.status_api as url, daftar_tables.id as id_daftar_table
    FROM daftar_tables
    INNER JOIN detail_tables ON daftar_tables.id=detail_tables.id_daftar_table ORDER BY detail_tables.createdAt ASC`;
    const table = await Table.findAll();
    if (!table) {
      return res.status(404).json({ error: 'User not found' });
    }
    db.query(sql, (err, result) => {    
    res.status(200).json({
        data: result
        });
    });  
  };



    exports.deleteTableID = async (req, res) => {
    const { id } = req.params;
    const table = await Table.findByPk(id);
    if (!table) {
      return res.status(404).json({ error: 'Detail not found' });
    }
    await table.destroy();
    res.status(200).json({
      status: 'Detail Table berhasil dihapus',
      data: table
    });
  };


  



