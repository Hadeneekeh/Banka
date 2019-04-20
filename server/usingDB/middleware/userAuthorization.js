import usersVerification from '../auth/auth';

const Verification = {
    checkUser(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const decode = usersVerification.verifyToken(token);

        req.user = decode;

        return next();
    }

}


export default Verification;
