const express = require('express');
const router = express.Router();
const db = require('../database/config');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => res.json('Homepage'));

router.get('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json('Incorrect form submission.');
    }

    db.select('email', 'hash')
        .from('login')
        .where('email', '=', email)
        .then(data => { 
            const isValid = data[0] && bcrypt.compareSync(password, data[0].hash);
            
            if (!isValid) {
                throw new Error('Invalid login credentials.');
            }
            
            return db.select('*').from('users')
                .where('email', '=', req.body.email)
                .then(user => {                                        
                    return res.json(user[0])
                })
                .catch(err => res.status(400).json(err.toString()));
    
        })
        .catch(err => res.status(400).json(err.toString()));
});

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const iterations = 10;
    console.log(1);
    console.log('db', db);

    if (!name || !email || !password) {
        return res.status(400).json('Incorrect form submission.');
    }

    bcrypt.genSalt(iterations, (saltErr, salt) => {
        if (saltErr) return res.status(400).json('Salt generation error.', saltErr);
        console.log(2);
        
        bcrypt.hash(password, salt, (hashErr, hash) => {
            if (hashErr) return res.status(400).json('Hash generation error.', hashErr);
            console.log(3);
            
            db.transaction(trx => {
                const loginInfo = { email, hash };
                console.log(4);
                
                trx.insert(loginInfo)
                    .into('login')
                    .returning('email')
                    .then(loginEmail => {                           
                        const newUser = {
                            name,
                            email: loginEmail[0],
                            joined: new Date()
                        };
                        console.log(5);
                        
                        return trx.insert(newUser)
                            .into('users')
                            .returning('*')
                            .then(registeredUser => {
                                return res.json(registeredUser[0])
                            })
                    })
                    .then(trx.commit)
                    .catch(trx.rollback);
            })
                .catch(err => res.status(400).json({
                    message: 'An error occurred during registration.',
                    error: err.toString()
                }));
        });
    });
});

router.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    // const user = db.users.find(userObj => userObj.id === id);
    db.select('*').from('users').where({ id }).then(user => console.log(user))

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json('No user was found.');
    }
});

module.exports = router;