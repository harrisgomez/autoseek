const handleRegister = (db, bcrypt) => (req, res) => {
    const { name, email, password } = req.body;
    const iterations = 10;
    
    if (!name || !email || !password) {        
        return res.status(400).json('Incorrect form submission.');
    }

    bcrypt.genSalt(iterations, (saltErr, salt) => {
        console.log('Salt generated');
        
        if (saltErr) return res.status(400).json('Salt generation error.', saltErr);
                
        bcrypt.hash(password, salt, (hashErr, hash) => {
            console.log('Hash generated');
            
            if (hashErr) return res.status(400).json('Hash generation error.', hashErr);
                        
            db.transaction(trx => {
                console.log('Starting db transaction');
                
                const loginInfo = { email, hash };

                console.log('Creating loginInfo', loginInfo);
                
                trx.insert(loginInfo)
                    .into('login')
                    .returning('id')
                    .then(loginID => {
                        console.log('loginInfo inserted into login table. Returning login id', loginID);
                        
                        const newUser = {
                            name,
                            email: loginEmail[0],
                            joined: new Date(),
                            login_id: loginID
                        };

                        console.log('Creating newUser', newUser);
                        
                        return trx.insert(newUser)
                            .into('users')
                            .returning('*')
                            .then(registeredUser => {
                                console.log('newUser inserted into users db. Returning registeredUser', registeredUser);
                                
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

module.exports = {
    handleRegister 
};