const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = {
    users: [
        {
            id: '123',
            name: 'Ash',
            email: 'ash@gmail.com',
            password: 'pikachu',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Gary',
            email: 'gary@gmail.com',
            password: 'squirtle',
            entries: 0,
            joined: new Date()
        }
    ]
};

app.get('/', (req, res) => {
    console.log('Home');
    res.json(db.users);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    const user = db.users.find(userObj => userObj.id === id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json('No such user found.');
    }
});

app.post('/signin', (req, res) => {
    const isValidEmail = req.body.email === db.users[0].email;
    const isValidPassword = req.body.password === db.users[0].password;

    if (isValidEmail && isValidPassword) {
        res.json('Successful signin');
    } else if (!isValidEmail) {
        res.status(400).json('An account with that email does not exist.');
    } else if (!isValidPassword) {
        res.status(400).json('Incorrect email/password combination.')
    }
});

app.put('/register', (req, res) => {
    const usersArr = db.users;
    const isEmailTaken = usersArr.some(({ email }) => req.body.email === email);
    const { id, name, email, password } = req.body;

    if (!isEmailTaken) {
        const newUser = {
            id,
            name,
            email,
            password,
            entries: 0,
            joined: new Date()
        };

        usersArr.push(newUser);
        res.status(200).json('Successfully registered account.');
    } else {
        res.status(400).json('That account already exists.');
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

