const express = require('express');
const router = express.Router();
const db = require('../database/config');
const bcrypt = require('bcryptjs');

const register = require('./register');
const signin = require('./signin');

router.get('/', (_req, res) => res.json('Homepage'));
router.post('/signin', signin.handleSignIn(db, bcrypt));
router.post('/register', register.handleRegister(db, bcrypt));

module.exports = router;