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
                
                return db("users")
                .transacting(trx)
                .insert(newUser)
                .then(() => {
                    const loginInfo = {
                        users_email: email,
                        hash
                    };

                    return db('login')
                            .transacting(trx)
                            .insert(loginInfo)
                    })
                    .then(trx.commit)
                    .catch(trx.rollback);
            })
                .then(function () {
                    return res.json({
                        name,
                        success_msg: 'Successfully registered new user.'
                    });
                })
                .catch(function () {
                    return res.json('Uh-oh! Error during registration process.');
                });
        });
    });
};

module.exports = {
    handleRegister
};