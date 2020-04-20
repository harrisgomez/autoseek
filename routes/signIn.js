module.exports.handleSignInRoute = (db, bcrypt) => (req, res) => {    
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {            
            const isValid = data[0] && bcrypt.compareSync(req.body.password, data[0].hash);
            
            if (!isValid) {
                throw new Error('Invalid login credentials.');
            }
            
            return db.select('*').from('users')
                .where('email', '=', req.body.email)
                .then(user => res.json(user[0]))
                .catch(err => res.status(400).json(err.toString()))
    
        })
        .catch(err => res.status(400).json(err.toString()));
}