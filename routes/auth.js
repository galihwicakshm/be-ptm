const express = require('express');
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/Auth');


const router = express.Router();

router.post('/auth/login',  AuthController.loginUser);
router.post('/auth/register',AuthController.registerUser);
router.post('/auth/logout',AuthController.logoutUser);


module.exports = router;
