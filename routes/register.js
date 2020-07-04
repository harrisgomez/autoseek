const handleRegister = (db, bcrypt) => (req, res) => {
    const { name, email, password } = req.body;
    const iterations = 10;

    if (!name || !email || !password) {
        return res.status(400).json('Incorrect form submission.');
    }

    bcrypt.genSalt(iterations, (saltErr, salt) => {
        if (saltErr) return res.status(400).json('Salt generation error.', saltErr);

        bcrypt.hash(password, salt, (hashErr, hash) => {
            if (hashErr) return res.status(400).json('Hash generation error.', hashErr);
            
            return db.transaction(trx => {                
                const newUser = {
                    email,
                    name,
                    joined: new Date()
                };

                return db('users')
                    .transacting(trx)
                    .insert(newUser)
                    .then((data) => {                        
                        const loginInfo = {
                            users_email: email,
                            hash
                        };

                        return db('login')
                            .transacting(trx)
                            .insert(loginInfo);
                    })
                    .then(trx.commit)
                    .catch(trx.rollback);
            })
            .then(result => res.json({
                message: 'Successfully registered new user.',
                success: result
            }))
            .catch(error => res.json({
                message: 'Failed to register new user.',
                error
            }));
        });
    });
};

module.exports = {
    handleRegister
};