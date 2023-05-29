import express from 'express';
import { logInfoMessage } from './logger.js';
import { addUser, getUsers } from './users.js';
import crypto from 'crypto';

const router = express.Router();

// Define endpoint for user addition
router.post('/addUser', (req, res, next) => {
    let email = req.query.email;
    let apiKey = crypto.randomBytes(20).toString('hex')
    addUser(email, apiKey);
    res.send({ email, apiKey });
    logInfoMessage(`User ${email} added with API key ${apiKey}`);
});

router.get('/getUsers', (req, res, next) => {
    let users = getUsers();
    res.send(users);
    logInfoMessage(`Users returned`);
});

export default router;