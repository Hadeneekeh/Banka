import moment from 'moment';
import helper from '../auth/auth';
import user from '../model/user-model';

const createUser = {
  async signupUser(req, res) {
    const hashPassword = helper.hashPassword(req.body.password);
    const values = [req.body.firstName, req.body.lastName, req.body.email, hashPassword];

    try {
      const result = await user.signUp(values);
      const token = await helper.generateToken(result[0]);

      return res.status(201).json(
        {
          status: res.statusCode,
          data: {
            token,
            id: result[0].id,
            firstName: result[0].firstname,
            lastName: result[0].lastname,
            email: result[0].email,
          },
        },
      );
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          status: 400,
          error: 'Email already exist',
        });
      }
      return res.status(500).json({
        status: res.statusCode,
        error: 'Internal error',
      });
    }
  },

  async signinUser(req, res) {
    const values = [req.body.email];
    try {
      const result = await user.signIn(values);

      if (result.rowCount < 1) {
        return res.status(401).json({
          status: res.statusCode,
          error: 'Enter a registered email address',
        });
      }

      const token = await helper.generateToken(result.rows[0]);

      if (!helper.comparePassword(req.body.password, result.rows[0].hashpassword)) {
        return res.status(401).json({
          status: res.statusCode,
          error: 'Incorrect password',
        });
      }

      return res.status(200).json(
        {
          status: res.statusCode,
          data: {
            token,
            id: result.rows[0].id,
            firstName: result.rows[0].firstname,
            lastName: result.rows[0].lastname,
            email: result.rows[0].email,
            type: result.rows[0].type,
          },
        },
      );
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error: 'Internal error',
      });
    }
  },

  async createStaff(req, res) {
    try {
      const hashPassword = await helper.hashPassword(req.body.password);
      const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        hashPassword,
        req.body.type,
        req.body.isAdmin,
        moment(new Date()),
      ];
      // const { rows } = await db.query(createUserQuery.users.createStaff, values);
      const created = await user.createNewUser(values);

      return res.status(201).json(
        {
          status: res.statusCode,
          data: {
            id: created.rows[0].id,
            firstName: created.rows[0].firstname,
            lastName: created.rows[0].lastname,
            email: created.rows[0].email,
            userType: created.rows[0].type,
            createdOn: created.rows[0].registeredon,
          },
        },
      );
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          status: 400,
          error: 'Email already exist',
        });
      }
      return res.status(500).json({
        status: res.statusCode,
        error: 'Internal error',
      });
    }
  },
};


export default createUser;
