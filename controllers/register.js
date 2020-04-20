module.exports.handleRegisterRoute = (db, bcrypt) => (req, res) => {
    const { name, email, password } = req.body;
    // const isEmailTaken = db.users.some(({ email }) =>
    //     req.body.email === email
    // );
    // console.log('Email taken?...', isEmailTaken);


    // if (!isEmailTaken) {
    const newUser = {
        name,
        email,
        joined: new Date()
    };

    /* 
    * user sends name, email, pw
    * connect to db and insert new user
    * if insert fails, handle err
    * if insert success, hash is stored
    * handle response to user
    */

    // db('users')
    //     .insert(newUser)
    //     .returning('*')
    //     .then(data => res.json(data))
    //     .catch(err => res.status(400).json('Error occurred during registration.'));
    // }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            newUser.pw_hash = hash;
            db('users')
                .insert(newUser)
                .returning('*')
                .then(data => res.status(200).json(data))
                .catch(err => res.status(400).json('Error occurred during registration.'));

            // return res.status(200).json(newUser);
        });
    });
    // } else {
    res.status(400).json('That email is unavailable.');
    // }
};