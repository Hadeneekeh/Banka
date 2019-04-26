import moment from 'moment';
import helper from '../auth/auth';
import db from '../../db';
import createUserQuery from '../migration/queries';

const User = {
  async signupUser(req, res) {
    // const newUser = {...req.body};

    const hashPassword = helper.hashPassword(req.body.password);


    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hashPassword,
    ];

    try {
      const { rows } = await db.query(createUserQuery.users.createUser, values);
      const token = await helper.generateToken({
        id: rows[0].id, email: rows[0].email, isAdmin: rows[0].isadmin, type: rows[0].type,
      });
      return res.status(201).json(
        {
          status: res.statusCode,
          data: {
            token,
            id: rows[0].id,
            firstName: rows[0].firstname,
            lastName: rows[0].lastname,
            email: rows[0].email,
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
      return res.status(400).send(error);
    }
  },

  async signinUser(req, res) {
    try {
      const { rows } = await db.query(createUserQuery.users.loginUser, [req.body.email]);


      const token = await helper.generateToken({ rows });


      if (!helper.comparePassword(req.body.password, rows[0].hashpassword)) {
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
            id: rows[0].id,
            firstName: rows[0].firstname,
            lastName: rows[0].lastname,
            email: rows[0].email,
          },
        },
      );
    } catch (error) {
      console.log(error);

      return res.status(400).json({
        status: res.statusCode,
        error: 'Ensure your inputs are correct',
      });
    }
  },

  async createStaff(req, res) {
    try {
      const hashPassword = helper.hashPassword(req.body.password);


      const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        hashPassword,
        req.body.type,
        req.body.isAdmin,
        moment(new Date()),
      ];
      const { rows } = await db.query(createUserQuery.users.createStaff, values);

      return res.status(201).json(
        {
          status: res.statusCode,
          data: {
            id: rows[0].id,
            firstName: rows[0].firstname,
            lastName: rows[0].lastname,
            email: rows[0].email,
            userType: rows[0].type,
            createdOn: rows[0].registeredon,
          },
        },
      );
    } catch (error) {
      console.log(error);
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          status: 400,
          error: 'Email already exist',
        });
      }
      return res.status(400).send(error);
    }
  },
};


export default User;
