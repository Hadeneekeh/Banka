import users from '../model/user.model';
import Helper from '../auth/authController';
import dummyData from '../utils/dummyUser';

const Usercontroller = {
    register(req, res) {
    
        const userInfo = {...req.body};  //gets user info from the request body

        // check for existing email
        const exist = dummyData.find(user => userInfo.email === user.email);

        if(exist) {
            return res.status(400).json({
                status: res.statusCode,
                error: 'The email already exist',
            })
        };
        
        const newUser = users.create(userInfo); //creates the user using the method created in the model

        const token = Helper.generateToken(newUser); //generates token

        //the response expected

        return res.status(201).json({
            status: res.statusCode,
            data: {
                token,
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            }
        }
        
        );
    },

    signIn(req, res) {
        const loginDetails = {...req.body};

        // use the login details to check if the user is registered
        const registeredUser = dummyData.find(aUser => loginDetails.email === aUser.email);

        const passwordIsValid = Helper.comparePassword(req.body.password, dummyData[0].password);
        if(!passwordIsValid) {
            return res.status(401).json({
                status: res.statusCode,
                error: "Unauthorized. Password is incorrect",
            });
        }

        if(!registeredUser) {
            return res.status(401).json({
                status: res.statusCode,
                error: "Unauthorized. Email deos not exist",
            });
        }
        const user = users.login(registeredUser);

        const token = Helper.generateToken(user);
        
       return res.status(202).json({
            status: res.statusCode,
            data: {
                token,
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        });
    }


}

export default Usercontroller;