import 'mocha';
import { expect } from 'chai';

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'secret';

describe('JWT Handler', () => {
  it('should generate a web token valid for 1 second.', () => {
    const token = jwt.sign({ user: { id: 120 } }, ADMIN_SECRET, { expiresIn: '100s' });
    console.log(token);
    expect(token).to.be.a('string');
  });
  it('should verify a valid token.', () => {
    const token = jwt.sign({ user: { id: 120 } }, ADMIN_SECRET, { expiresIn: '100s' });
    const verifiedToken = jwt.verify(token, ADMIN_SECRET);
    console.log(verifiedToken);
    expect(verifiedToken).to.be.an('object');
  });
});
