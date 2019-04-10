import  usersVerification from '../auth/authController';

const Verification = {
    checkUser(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const decode = usersVerification.verifyToken(token);

        req.user = decode;

        //console.log(req.user);

        return next();
    }
}


export default Verification;
