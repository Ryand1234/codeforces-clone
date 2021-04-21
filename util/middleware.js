const jwt = require('jsonwebtoken')

const userAuthorize = async (req, res, next) => {
  //Getting authorization header option
  const authHeader = req.headers['authorization'];
  //Getting token from authorization header
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    res.status(401);
    next();
  }
  //Verifying JWT Token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.status(401);
    }
    req.user = user;
    next();
  });
};

module.exports = userAuthorize;