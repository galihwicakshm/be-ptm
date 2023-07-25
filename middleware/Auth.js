const jwt = require('jsonwebtoken');
const { secret } = require('../database/jwtConfig');

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

module.exports = auth;
