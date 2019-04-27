import db from '../../db';
import createUserQuery from '../migration/queries';

const user = {
  async signUp(values) {
    const { rows } = await db.query(createUserQuery.users.createUser, values);

    return rows;
  },

  async signIn(values) {
    const response = await db.query(createUserQuery.users.loginUser, values);

    return response;
  },

  async createNewUser(values) {
    const result = await db.query(createUserQuery.users.createStaff, values);

    return result;
  },
};

export default user;
