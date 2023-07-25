const express = require('express');
const userController = require('../controllers/UserControllers');
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

router.get('/all-users', authMiddleware, userController.getAllUser);
router.get('/user/:id', authMiddleware, userController.getUserID);
router.delete('/user/delete/:id', authMiddleware, userController.deleteUserID);
router.put('/user/update/:id', authMiddleware, userController.updateUserID);
router.put('/user-password/update/:id', authMiddleware, userController.updatePasswordUserID);


module.exports = router;
