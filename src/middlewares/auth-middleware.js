const jwt = require('jsonwebtoken');
const moment = require('moment');

const excludeUrls = ['/login'];

const AuthMiddleware = (req, res, next) => {
  if (excludeUrls.includes(req.path)) next();
  else {
    const { authorization } = req.headers;
    const { JWT_SECRET } = process.env;

    if (!authorization) res.send({ message: 'URL needs authentication' });

    const decoded = jwt.verify(authorization, JWT_SECRET);
    const now = moment().unix();

    if (now > decoded.exp) res.send({ message: 'expired token' });

    req.decoded = decoded;

    next();
  }
};

module.exports = AuthMiddleware;
