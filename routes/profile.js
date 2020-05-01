module.exports.handleProfileRoute = db => (req, res) => {
    const { id } = req.params;
    // const user = db.users.find(userObj => userObj.id === id);
    db.select('*').from('users').where({ id }).then(user => console.log(user))

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json('No user was found.');
    }
};