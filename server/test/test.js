import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { it } from 'mocha';

chai.use(chaiHttp);


// const testUserSignUp = ;

const signUpUrl = '/v1/auth/signup'; 


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

