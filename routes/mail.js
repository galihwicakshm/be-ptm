const express = require('express');
const router = express.Router();
const MailController = require('../controllers/MailController');

// definisikan route untuk mengirim email
router.post('/kirim-email', MailController.kirimEmail);
router.post('/kirim-email-table', MailController.kirimEmailTable);

module.exports = router;
