
const DetailTable = require("../models/DetailTable")
const Table = require('../models/Table');


    exports.getTables = async (req, res) => {
    const sql = 'SELECT * from detail_tables';
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
    const table = await DetailTable.findByPk(id);
    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }
    const tablecreate = DetailTable.update(req.body, {
          where: {
                id: req.params.id
          }
        });
        res.json({
        status: "succes",
        data: tablecreate
      });
  }


    exports.getDetailTableID = async (req, res) => {
    const { id} = req.params;
    const table = await DetailTable.findOne({ where: { id: id } });
    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }
    res.json({
      status: 'succes',
      data:table
    });
  };


    exports.updateDetailTableNama = async (req, res) => {
    const { id } = req.params;
    const { nama} = req.body;
    const detailtable = await DetailTable.findByPk(id);
    if (!detailtable) {
      return res.status(404).json({ error: 'Table not found' });
    }
    await detailtable.update({
      nama,
    });
    res.json({
      status: "succes",
      data: detailtable
    });
  };


    exports.updateDetailTableSTATUSAPI = async (req, res) => {
    const { id } = req.params;
    const { status_api} = req.body;
    const detailtable = await DetailTable.findByPk(id);
    if (!detailtable) {
      return res.status(404).json({ error: 'Detail Table not found' });
    }
    await detailtable.update({
      status_api,
    });
    res.json({
      status: "succes",
      data: detailtable
    });
  };

    exports.deletDetailTableID = async (req, res) => {
    const { id } = req.params;
    const detailtable = await DetailTable.findByPk(id);
    if (!detailtable) {
      return res.status(404).json({ error: 'Detail Table not found' });
    }
    await detailtable.destroy();
    res.status(200).json({
      status: 'Detail Table berhasil dihapus',
      data: detailtable
    });
  };

  exports.updateTablesID = async(req,res) => {
    const { id } = req.params;
    const { nama, status_api, url} = req.body;
    const table = await Table.findByPk(id);
    if (!table) {
      return res.status(404).json({ error: 'User not found' });
    }
    const tablecreate = await DetailTable.create({ 
        nama,id_daftar_table:id, status_api, url
      });
    res.json({
      status: "succes",
      data: tablecreate
    });
  }



