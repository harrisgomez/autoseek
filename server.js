const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const routes = require('./routes/api');
const morgan = require('morgan');
const dotenv = require('dotenv');

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

    console.log("Production build");
} else {
    // Load local environment variables in dev
    dotenv.config();
    
    console.log("Development build");
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

