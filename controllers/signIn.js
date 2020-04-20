module.exports.handleSignInRoute = db => (req, res) => {
    if (db.users.length) {
        db.users.forEach(user => {
            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => isMatch && res.status(200).json(user))
                .catch(console.error);
        });
    } else {
        res.status(400).json('There was a problem signing in.');
    }
}