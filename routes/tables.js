const express = require('express');
const TableController = require('../controllers/TableController');
const DetailTableController = require('../controllers/DetailTableController')
const secretKey = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');


const router = express.Router();

function authMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Missing authorization header' });
  }

  const [bearer, token] = req.headers.authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid authorization header' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}



router.post ('/daftar-table/store', authMiddleware, TableController.tambahTable);
router.get ('/daftar-tables',  TableController.getDaftarTables);
router.get ('/daftar-table/:id',  authMiddleware,TableController.getDaftarTablesID);
router.delete ('/daftar-table/delete/:id', authMiddleware, TableController.deleteTableID);


router.get ('/join-table/:id',TableController.getJoinTablesID);
router.get ('/join-tables', TableController.getJoinTables);
router.get ('/join-all', TableController.getAllTables);



//detail table || Hostname
router.post ('/detail-table/store/:id', authMiddleware, DetailTableController.updateTablesID);
router.get ('/detail-table/:id', authMiddleware, DetailTableController.getDetailTableID);
router.put ('/detail-table/update/nama/:id', authMiddleware, DetailTableController.updateDetailTableNama);
router.put ('/detail-table/update/status-api/:id', authMiddleware, DetailTableController.updateDetailTableSTATUSAPI);
router.delete ('/detail-table/delete/:id', authMiddleware, DetailTableController.deletDetailTableID);

module.exports = router;
