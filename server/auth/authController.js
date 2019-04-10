import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';

const salt = 10;
const Helper = {
    hashPassword(password) {
        return bcrypt.hashSync(password, salt);
      },

   
    generateToken(payload) {
        const token = jwt.sign(
          payload, config.secret, {expiresIn: 86400});
        return token;
      },

    
    
}

export default Helper;