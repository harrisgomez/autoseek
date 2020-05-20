const express = require('express');
const router = express.Router();
const db = require('../database/config');
const bcrypt = require('bcryptjs');
const register = require('./register');
const signIn = require('./signin');

router.get('/', (req, res) => res.json('Homepage'));
router.post('/signin', signIn.handleSignIn(db, bcrypt));
router.post('/register', register.handleRegister(db, bcrypt));

module.exports = router;