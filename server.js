const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

/* 
TODO Move options to knex config file
TODO Refine routes
TODO Implement Async Bcrypt in /register
TODO Implement db transaction
*/

// * DB config
const db = knex({
    client: 'pg',
    connection: 'postgres://postgres:test@localhost:5432/facefacts_db',
    pool: {
        min: 0,
        max: 7,
        afterCreate: (conn, done) => {
            conn.query('SET timezone="UTC";', err => {
                if (err) {
                    console.log(err);
                }
                done(err, conn);
            });
        }
    }
});
// ! Uncomment & run this query to test for successful connection by returning some data from a known table in our db
// db.select().from('users').then(console.log).catch(console.error);


// * Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


// * Routes
app.get('/', (req, res) => {
    res.status(200).json(db);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    // const user = db.users.find(userObj => userObj.id === id);
    db.select('*').from('users').where({ id }).then(user => console.log(user))

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json('No user was found.');
    }
});

app.post('/signin', (req, res) => {
    if (db.users.length) {
        db.users.forEach(user => {
            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => isMatch && res.status(200).json(user))
                .catch(console.error);
        });
    } else {
        res.status(400).json('There was a problem signing in.');
    }
});

app.post('/register', (req, res) => {
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
});

app.put('/album', (req, res) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('album', 1)
        .returning('album')
        .then(album => res.json(album))
        .catch(err => res.status(400).json('Error updating album.'));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

