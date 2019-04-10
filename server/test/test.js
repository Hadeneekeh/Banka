import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { it } from 'mocha';

chai.use(chaiHttp);


// const testUserSignUp = ;

const signUpUrl = '/v1/auth/signup'; 
const signInUrl = '/v1/auth/signin'; 


describe('Test for User signUp controller', () => {
    it('should register a new user when all the details are provided', () => {
        chai.request(app)
        .post(signUpUrl)
        .send({
            firstName: 'Mat',
            lastName: 'Eniola',
            email: 'm.eny@banka.com',
            password: 'password'
        })
        .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(201);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.have.property('token');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('firstName');
            expect(res.body.data).to.have.property('lastName');
            expect(res.body.data).to.have.property('email');
            expect(res.body.data.token).to.be.a('string');
        });
    });

    it('should not register a user when an existing email is used', () => {
        chai.request(app)
        .post(signUpUrl)
        .send({
            firstName: 'Epeh',
            lastName: 'Ire',
            email: 'm.eny@banka.com',
            password: 'password'
        })
        .end((err, res) =>{
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(400);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.be.a('string');
        });
    });
});

describe('Test for User signIn controller', () => {
    it('should sign in a user when the correct detail is provided', () => {
        chai.request(app)
        .post(signInUrl)
        .send({
            email: 'm.eny@banka.com',
            password: 'password'
        })
        .end((err, res) => {
            expect(res).to.have.status(202);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(202);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.have.property('token');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('firstName');
            expect(res.body.data).to.have.property('lastName');
            expect(res.body.data).to.have.property('email');
            expect(res.body.data.token).to.be.a('string');
        });
    });

    it('should not sign in a user when password is incorrect', () => {
        chai.request(app)
        .post(signInUrl)
        .send({
            email: 'm.eny@banka.com',
            password: 'pword'
        })
        .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(401);
            expect(res.body.data).to.have.property('error');
            expect(res.body.data.error).to.be.a('Unauthorized. Password is incorrect');
        });
    });

    it('should not sign in a user when email is incorrect', () => {
        chai.request(app)
        .post(signInUrl)
        .send({
            email: 'm.gbeny@banka.com',
            password: 'password'
        })
        .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(401);
            expect(res.body.data).to.have.property('error');
            expect(res.body.data.error).to.be.a('Unauthorized. Email deos not exist');
        });
    });
});
