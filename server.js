const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const signIn = require('./routes/signIn');
const register = require('./routes/register');
const profile = require('./routes/profile');
// const album = require('./routes/album');


// * MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// ! Resolves 'Error: self signed certificate' caused by 'SSL: true'. May have to do w/ free heroku acc(?)
// ! Note this is not secure for production. OK for local dev
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// * DB CONFIG
let dbConnection;

if (process.env.DATABASE_URL) {
    dbConnection = {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    };
} else {
    dbConnection = 'postgres://postgres:test@localhost:5432/facefacts_db';
}

const db = knex({
    client: 'pg',
    connection: dbConnection
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

// * ROUTES
app.get('/', (_req, res) => res.send('Working'));
app.post('/signin', signIn.handleSignInRoute(db, bcrypt));
app.post('/register', register.handleRegisterRoute(db, bcrypt));
app.get('/profile/:id', profile.handleProfileRoute(db));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

