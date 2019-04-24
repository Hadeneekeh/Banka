import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';

const salt = 10;
const Helper = {
    hashPassword(password) {
        return bcrypt.hashSync(password, salt);
      },

    comparePassword(password, hashPassword) {
        return bcrypt.compareSync(password, hashPassword);
      }, 
   
    generateToken(payload) {
        const token = jwt.sign(
          payload, config.secret, {expiresIn: 86400});
        return token;
      },

    verifyToken(token) {
        const decoded = jwt.verify(token, config.secret);
        return decoded;
      }
    
}


export default Helper;
