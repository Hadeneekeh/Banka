import usersVerification from '../auth/auth';

const authenticate = (req) => {
  const token = req.headers.authorization.split(' ')[1];
  const decode = usersVerification.verifyToken(token);
  req.user = decode;

  return req.user;
};

const verification = {
// Checks if the token is for a user

  verifyUser(req, res, next) {
    try {
      authenticate(req);
      return next();
    } catch (error) {
      return res.status(401).send({
        status: res.statusCode,
        error: 'Authentication failed',
      });
    }
  },

  // Check if the token is for an Admin
  verifyAdmin(req, res, next) {
    try {
      authenticate(req);
      if (!req.user.isadmin) {
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
  verifyCashier(req, res, next) {
    try {
      authenticate(req);

      if (req.user.type !== 'cashier') {
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
