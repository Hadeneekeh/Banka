import  usersVerification from '../auth/authController';

const Verification = {
    checkUser(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const decode = usersVerification.verifyToken(token);

        req.user = decode;

        //console.log(req.user);

        return next();
    },

    checkStaff(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const decode = usersVerification.verifyToken(token);

        req.user = decode;

        if(req.user.type !== 'staff') {
            return res.status(403).send({
                status: res.statusCode,
                error: 'Unauthorized'
            });
        };

        return next();
    }
}


export default Verification;
