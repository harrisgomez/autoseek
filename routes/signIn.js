module.exports.handleSignInRoute = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json('Incorrect form submission.');
    }

    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {            
            const isValid = data[0] && bcrypt.compareSync(password, data[0].hash);
            
            if (!isValid) {
                throw new Error('Invalid login credentials.');
            }
            
            return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => res.json(user[0]))
                .catch(err => res.status(400).json(err.toString()))
    
        })
        .catch(err => res.status(400).json(err.toString()));
}