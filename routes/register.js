module.exports.handleRegisterRoute = (db, bcrypt) => (req, res) => {
    const { name, email, password } = req.body;
    const iterations = 10;
    console.log(1);
    
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
};