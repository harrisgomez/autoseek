const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = {
    users: [
        // {
        //     id: '124',
        //     name: 'Gary',
        //     email: 'gary@gmail.com',
        //     password: 'squirtle',
        //     entries: 0,
        //     joined: new Date()
        // },
        // {
        //     id: '123',
        //     name: 'ash',
        //     email: 'ash@gmail.com',
        //     password: 'pika',
        //     album: [],
        //     joined: new Date()
        // }
    ]
};

app.get('/', (req, res) => {
    res.status(200).json(db);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    const user = db.users.find(userObj => userObj.id === id);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json('No such user found.');
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
        res.status(400).json('There was a problem signing in');
    }
});

app.post('/register', (req, res) => {
    const isEmailTaken = db.users.some(({ email }) => req.body.email === email);
    const { name, email, password } = req.body;
    const newUser = {
        id: parseInt(db.users.length + 1),
        name,
        email,
        password,
        album: []
    };

    if (!isEmailTaken) {
        bcrypt.genSalt(10, (err, salt) => {
            console.log('salt generated', salt);
            bcrypt.hash(password, salt, (err, hash) => {
                newUser.password = hash;
                db.users.push(newUser);
                return res.status(200).json(newUser);
            });
        });
    } else {
        res.status(400).json('That email is unavailable.');
    }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

