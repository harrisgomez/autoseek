const handleSignIn = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json('Incorrect form submission.');
    }

    db('login')
        .where({ users_email: email })
        .then(rowsFromLoginTable => {
            const isValid = rowsFromLoginTable[0] && bcrypt.compareSync(password, rowsFromLoginTable[0].hash);

            if (!isValid) {
                throw new Error('Invalid login credentials.');
            }

            return db('users')
                .where({ email })
                .then(rowsFromUsersTableArr => {
                    return res.json(rowsFromUsersTableArr[0])
                })
                .catch(err => res.status(400).json(err.toString()));

        })
        .catch(err => res.status(400).json(err.toString()));
};

module.exports = {
    handleSignIn
};