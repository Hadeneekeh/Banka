import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.should();
chai.use(chaiHttp);

// const testUserSignUp = ;

const signUpUrl = '/api/v1/auth/signup'; 
const signInUrl = '/api/v1/auth/signin'; 
const accountUrl = '/api/v1/account';
const accountUpdateUrl = '/api/v1/account/8335248559'



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

    it('should not register a user when an existing email is used', (done) => {
        chai.request(app)
        .post(signUpUrl)
        .send({
            firstName: 'Epeh',
            lastName: 'Ire',
            email: 'm.eny@banka.com',
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
            email: 'm.eny@banka.com',
            password: 'password'
        })
        .end((err, res) => {
            expect(res).to.have.status(202);
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.equal(202);
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
            email: 'm.eny@banka.com',
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
            email: 'm.gbeny@banka.com',
            password: 'password'
        })
        .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            done();
        });
    });
});

describe('Test for create bank account', () => {
    it('should create an account', (done) => {
        chai.request(app)
        .post(signInUrl)
        .send({
            email: 'g.ade@banka.com',
            password: 'password',
        })
        .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data.token}`;
        

        chai.request(app)
        .post(accountUrl)
        .set('Authorization', token)
        .send({
            type: 'savings',
            openingBalance: 10000.00,
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
});


describe('Test for update account status', () => {
    it('should update an account', (done) => {
        chai.request(app)
        .post(signInUrl)
        .send({
            email: 'g.ade@banka.com',
            password: 'password',
        })
        .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data.token}`;
        

        chai.request(app)
        .patch(accountUpdateUrl)
        .set('Authorization', token)
        .send({
            status: 'Dormat',
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.equal(200);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('object');
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
            email: 'g.ade@banka.com',
            password: 'password',
        })
        .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data.token}`;
        
        chai.request(app)
        .delete(accountUpdateUrl)
        .set('Authorization', token)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.equal(200);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('Account deleted successfully');
            done();
        });
    });
    });
    });
