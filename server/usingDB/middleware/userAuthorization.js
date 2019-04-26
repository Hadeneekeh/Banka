import usersVerification from '../auth/auth';

const verification = {
// Checks if the token is for a user

  checkUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decode = usersVerification.verifyToken(token);
      req.user = decode;
      return next();
    } catch (error) {
      return res.status(401).send({
        status: res.statusCode,
        error: 'Authentication failed',
      });
    }
  },
  // Check if the token is for an Admin
  checkAdmin(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decode = usersVerification.verifyToken(token);
      req.user = decode;

      if (!req.user.rows[0].isadmin) {
        return res.status(401).send({
          status: res.statusCode,
          error: 'Unauthorized',
        });
      }
      return next();
    } catch (error) {
      return res.status(401).send({
        status: res.statusCode,
        error: 'Authentication failed',
      });
    }
  },
  // Checks if the token is for Cashier
  checkCashier(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decode = usersVerification.verifyToken(token);
      req.user = decode;

      if (req.user.rows[0].type !== 'cashier') {
        return res.status(401).json({
          status: res.statusCode,
          error: 'Unauthorized',
        });
      }
      return next();
    } catch (error) {
      return res.status(401).send({
        status: res.statusCode,
        error: 'Authentication failed',
      });
    }
  },
};


export default verification;
