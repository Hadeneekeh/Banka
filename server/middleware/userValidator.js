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
            return res.status(401).send({
                status: res.statusCode,
                error: 'Unauthorized'
            });
        };

        return next();
    },

    checkAdmin(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const decode = usersVerification.verifyToken(token);

        req.user = decode;

        if(!req.user.isAdmin) {
        return res.status(401).send({
            status: res.statusCode,
            error: 'Unauthorized'
        });
    }
        
        return next();
        
    },

    checkCashier(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const decode = usersVerification.verifyToken(token);

        req.user = decode;

        if(!req.user.isCashier) {
        return res.status(401).json({
            status: res.statusCode,
            error: 'Unauthorized'
        });
    }
        
        return next();
        
    }
}


export default Verification;
