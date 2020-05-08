const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const routes = require('./routes/api');
const morgan = require('morgan');

// * MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny')); // logger

// * HTTP requests
app.use('/api', routes);

// * Serve static assets if in prod
if (process.env.NODE_ENV === 'production') {
    // Set the static dir
    app.use('/face-facts/', express.static('client/build'));

    // Any req other than to /api should load index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// * ROUTES
// app.get('/', (_req, res) => res.send(app.use(express.static(__dirname + '/'))));
// app.post('/signin', signIn.handleSignInRoute(db, bcrypt));
// app.post('/register', register.handleRegisterRoute(db, bcrypt));
// app.get('/profile/:id', profile.handleProfileRoute(db));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

