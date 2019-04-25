import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { it, describe } from 'mocha';

chai.should();
chai.use(chaiHttp);


const signUpUrl = '/api/v1/auth/signup'; 
const signInUrl = '/api/v1/auth/signin'; 
const accountUrl = '/api/v1/accounts';
const accountUpdateUrl = '/api/v1/accounts/2345987610';
const accountDeleteUrl = '/api/v1/accounts/9874561230';
const accountDebitUrl = '/api/v1/transactions/2345987610/debit';
const accountCreditUrl = '/api/v1/transactions/2345987610/credit';
const getAllAccountsByEmail = '/api/v1//user/ade.banke@example.com/accounts';

describe('Test for wrong route', () => {
    it('should see a custom error message when hitting wrong route', (done) => {
            chai.request(app)
            .post('/api/v1/auth/sign')
            .send({
                firstName: 'Mat',
                lastName: 'Eniola',
                email: 'test@banka.com',
                password: 'password'
            })
            .end((err, res) => {
                expect(res.body.status).to.equal(404);
                done();
            });
        });
    });


describe('Test for User signUp controller', () => {
    it('should register a new user when all the details are provided', (done) => {
        chai.request(app)
        .post(signUpUrl)
        .send({
            firstName: 'Mat',
            lastName: 'Eniola',
            email: 'test@banka.com',
            password: 'password'
        })
        .end((err, res) => {
            expect(res.body.status).to.equal(201);
            expect(res.body.data).to.be.a('object');
            expect(res.body.data).to.have.property('token');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('firstName');
            expect(res.body.data).to.have.property('lastName');
            expect(res.body.data).to.have.property('email');
            expect(res.body.data.token).to.be.a('string');
            done();
        });
    });

    it('should not register a user when first name is missing', (done) => {
        chai.request(app)
        .post(signUpUrl)
        .send({
            firstName: '',
            lastName: 'Ire',
            email: 'test@banka.com',
            password: 'password'
        })
        .end((err, res) =>{
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });

    it('should not register a user when last name is missing', (done) => {
        chai.request(app)
        .post(signUpUrl)
        .send({
            firstName: 'Ire',
            lastName: '',
            email: 'test@banka.com',
            password: 'password'
        })
        .end((err, res) =>{
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });

    it('should not register a user when the supplied email is not valid', (done) => {
        chai.request(app)
        .post(signUpUrl)
        .send({
            firstName: 'Ire',
            lastName: 'Habi',
            email: 'test',
            password: 'password'
        })
        .end((err, res) =>{
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });

    it('should not register a user when password is missing', (done) => {
        chai.request(app)
        .post(signUpUrl)
        .send({
            firstName: 'Ire',
            lastName: 'Habi',
            email: 'test',
            password: ''
        })
        .end((err, res) =>{
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });

    it('should not register a user when email is missing', (done) => {
        chai.request(app)
        .post(signUpUrl)
        .send({
            firstName: 'Ire',
            lastName: 'Habi',
            email: '',
            password: 'password'
        })
        .end((err, res) =>{
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });

    it('should not register a user when an existing email is used', (done) => {
        chai.request(app)
        .post(signUpUrl)
        .send({
            firstName: 'Epeh',
            lastName: 'Ire',
            email: 'test@banka.com',
            password: 'password'
        })
        .end((err, res) =>{
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });
});

describe('Test for User signIn controller', () => {
    it('should sign in a user when the correct detail is provided', (done) => {
        chai.request(app)
        .post(signInUrl)
        .send({
            email: 'test@banka.com',
            password: 'password'
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.equal(200);
            expect(res.body.data).to.be.a('object');
            expect(res.body.data).to.have.property('token');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('firstName');
            expect(res.body.data).to.have.property('lastName');
            expect(res.body.data).to.have.property('email');
            expect(res.body.data.token).to.be.a('string');
            done();
        });
    });

    it('should not sign in a user when password is incorrect', (done) => {
        chai.request(app)
        .post(signInUrl)
        .send({
            email: 'test@banka.com',
            password: 'pword'
        })
        .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            done();
        });
    });

    it('should not sign in a user when email is incorrect', (done) => {
        chai.request(app)
        .post(signInUrl)
        .send({
            email: 'testing@banka.com',
            password: 'password'
        })
        .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.equal(400);
            expect(res.body).to.have.property('error');
            done();
        });
    });

    it('should not sign in a user when password is missing', (done) => {
        chai.request(app)
        .post(signInUrl)
        .send({
            email: 'test',
            password: ''
        })
        .end((err, res) =>{
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });

    it('should not sign in a user when email is missing', (done) => {
        chai.request(app)
        .post(signInUrl)
        .send({
            email: '',
            password: 'password'
        })
        .end((err, res) =>{
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });

    it('should not sign in a user when the supplied email is invalid', (done) => {
        chai.request(app)
        .post(signUpUrl)
        .send({
            email: 'test',
            password: 'password'
        })
        .end((err, res) =>{
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });
});

describe('Test for create bank account', () => {
    it('should create an account', (done) => {
        chai.request(app)
        .post(signInUrl)
        .send({
             email: 'ade.banke@example.com',
             password: 'password'
        })
        .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data.token}`;
        

        chai.request(app)
        .post(accountUrl)
        .set('Authorization', token)
        .send({
            type: 'savings',
            
        })
        .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.equal(201);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('object');
            done();
        });
    });
    });

    

    it('it should not create account when type is not selected', (done) => {
        chai.request(app)
        .post(signInUrl)
        .send({
             email: 'test@banka.com',
             password: 'password'
        })
        .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data.token}`;
        

        chai.request(app)
        .post(accountUrl)
        .set('Authorization', token)
        .send({
            type: '',
        })
        .end((err, res) =>{
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
    });
});
    });
});


describe('Test for update account status', () => {
    it('should update an account', (done) => {
        chai.request(app)
        .post(signInUrl)
        .send({
            email: 'hadeneekeh01@gmail.com',
            password: 'password',
        })
        .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data.token}`;
        

        chai.request(app)
        .patch(accountUpdateUrl)
        .set('Authorization', token)
        .send({
            status: 'dormant',
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.equal(200);
            expect(res.body).to.have.property('data');
            //expect(res.body.data).to.be.a('object');
            done();
        });
    });
    });
    });

    describe('Test for Delete an account', () => {
        it('should delete an account', (done) => {
        chai.request(app)
        .post(signInUrl)
        .send({
            email: 'hadeneekeh01@gmail.com',
            password: 'password',
        })
        .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data.token}`;
        
        chai.request(app)
        .delete(accountDeleteUrl)
        .set('Authorization', token)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.equal(200);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('Account successfully deleted');
            done();
        });
    });
    });

    it('should not authorize a user that is not admin', (done) => {
        chai.request(app)
        .post(signInUrl)
        .send({
            email: 'ade.banke@example.com',
            password: 'password',
        })
        .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data.token}`;
        
        chai.request(app)
        .delete(accountDeleteUrl)
        .set('Authorization', token)
        .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal('Unauthorized');
            done();
        });
        });
    });
});


describe('Test for the endpoint to debit an account', () => {
    it('should debit an account when the login user is authorized', (done) => {
            chai.request(app)
            .post(signInUrl)
            .send({
                email: 'cashier@gmail.com',
                password: 'password',
            })
            .end((loginErr, loginRes) => {
                const token = `Bearer ${loginRes.body.data.token}`;
            
            chai.request(app)
            .post(accountDebitUrl)
            .set('Authorization', token)
            .send({
                amount: 2000
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data[0]).to.have.property('transactionId');                
                expect(res.body.data[0]).to.have.property('transactionType');
                expect(res.body.data[0]).to.have.property('accountNumber');
                expect(res.body.data[0]).to.have.property('amount');
                expect(res.body.data[0]).to.have.property('cashier');
                expect(res.body.data[0]).to.have.property('accountBalance');
                done();
            });
        });
    });

    it('should not debit account when amount is less than balance', (done) => {
        chai.request(app)
            .post(signInUrl)
            .send({
                email: 'cashier@gmail.com',
                password: 'password',
            })
            .end((loginErr, loginRes) => {
                const token = `Bearer ${loginRes.body.data.token}`;
            
            chai.request(app)
            .post(accountDebitUrl)
            .set('Authorization', token)
            .send({
                amount: 900000
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.a('object');
                expect(res.body.status).to.equal(400);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Insufficient Balance')
                done();
            });
        });
    });

    it('should not debit account when amount is empty', (done) => {
        chai.request(app)
            .post(signInUrl)
            .send({
                email: 'cashier@gmail.com',
                password: 'password',
            })
            .end((loginErr, loginRes) => {
                const token = `Bearer ${loginRes.body.data.token}`;
            
            chai.request(app)
            .post(accountDebitUrl)
            .set('Authorization', token)
            .send({
                amount: ''
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.a('object');
                expect(res.body.status).to.equal(400);
                expect(res.body).to.have.property('error');
                done();
            });
        });
    });

    it('should not debit account when amount is not a number', (done) => {
        chai.request(app)
            .post(signInUrl)
            .send({
                email: 'cashier@gmail.com',
                password: 'password',
            })
            .end((loginErr, loginRes) => {
                const token = `Bearer ${loginRes.body.data.token}`;
            
            chai.request(app)
            .post(accountDebitUrl)
            .set('Authorization', token)
            .send({
                amount: 'asdf'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.a('object');
                expect(res.body.status).to.equal(400);
                expect(res.body).to.have.property('error');
                done();
            });
        });
    });
});

describe('Test for the endpoint to credit an account', () => {
    it('should credit an account when the login user is authorized', (done) => {
            chai.request(app)
            .post(signInUrl)
            .send({
                email: 'cashier@gmail.com',
                password: 'password',
            })
            .end((loginErr, loginRes) => {
                const token = `Bearer ${loginRes.body.data.token}`;
            
            chai.request(app)
            .post(accountCreditUrl)
            .set('Authorization', token)
            .send({
                amount: 2000
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('data');
                expect(res.body.data[0]).to.have.property('transactionId');                
                expect(res.body.data[0]).to.have.property('transactionType');
                expect(res.body.data[0]).to.have.property('accountNumber');
                expect(res.body.data[0]).to.have.property('amount');
                expect(res.body.data[0]).to.have.property('cashier');
                expect(res.body.data[0]).to.have.property('accountBalance');
                done();
            });
        });
    });
});

describe('Test for endpoint to view all accounts', () => {
    it('should display all accounts if admin sign in', (done) => {
            chai.request(app)
            .post(signInUrl)
            .send({
                email: 'hadeneekeh01@gmail.com',
                password: 'password',
            })
            .end((loginErr, loginRes) => {
                const token = `Bearer ${loginRes.body.data.token}`;
            
            chai.request(app)
            .get(accountUrl)
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.status).to.equal(200);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.a('Array');
                done();
            });
        });
    });
});

describe('Endpoint to view an account details', () => {
    it('should display details a specified account', (done) => {
            chai.request(app)
            .post(signInUrl)
            .send({
                email: 'ade.banke@example.com',
                password: 'password',
            })
            .end((loginErr, loginRes) => {
                const token = `Bearer ${loginRes.body.data.token}`;
            
            chai.request(app)
            .get(accountUpdateUrl)
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.status).to.equal(200);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.a('Array');
                expect(res.body.data[0]).to.be.a('Object');
                done();
             });
        })
    });
});

describe('Endpoint to get account by email', () => {
        it('should display all accounts of a specific user', (done) => {
            chai.request(app)
            .post(signInUrl)
            .send({
                email: 'hadeneekeh01@gmail.com',
                password: 'password',
            })
            .end((loginErr, loginRes) => {
                const token = `Bearer ${loginRes.body.data.token}`;
            
            chai.request(app)
            .get(getAllAccountsByEmail)
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.status).to.equal(200);
                expect(res.body).to.have.property('accounts');
                expect(res.body.accounts).to.be.a('Array');
                expect(res.body.accounts[0]).to.be.a('Object');
                done();
            });
        })
    });
    
    it('should not display accounts if email does not exist', (done) => {
        chai.request(app)
            .post(signInUrl)
            .send({
                email: 'hadeneekeh01@gmail.com',
                password: 'password',
            })
            .end((loginErr, loginRes) => {
                const token = `Bearer ${loginRes.body.data.token}`;
            
            chai.request(app)
            .get('/api/v1//user/ade.bank@example.com/accounts')
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.a('object');
                expect(res.body.status).to.equal(404);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Email does not exist');
                done();
            });
        });
    });
});

describe('Test for endpoint to get accounts using account status', () => {
    it('should display active accounts when admin signs in', (done) => {
            chai.request(app)
            .post(signInUrl)
            .send({
                email: 'hadeneekeh01@gmail.com',
                password: 'password',
            })
            .end((loginErr, loginRes) => {
                const token = `Bearer ${loginRes.body.data.token}`;
            
            chai.request(app)
            .get(`${accountUrl}/?status=active`)
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.status).to.equal(200);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.a('Array');
                expect(res.body.data[0].status).to.equal('active');
                done();
            });
        });
    });

    it('should display active accounts when admin signs in', (done) => {
            chai.request(app)
            .post(signInUrl)
            .send({
                email: 'hadeneekeh01@gmail.com',
                password: 'password',
            })
            .end((loginErr, loginRes) => {
                const token = `Bearer ${loginRes.body.data.token}`;
            
            chai.request(app)
            .get(`${accountUrl}/?status=dormant`)
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.status).to.equal(200);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.a('Array');
                expect(res.body.data[0].status).to.equal('dormant');
                done();
            });
        });
    });
});

