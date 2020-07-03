const knex = require('knex');
const dotenv = require('dotenv');

dotenv.config();

// ! Resolves 'Error: self signed certificate' caused by 'SSL: true'. May have to do w/ free heroku acc(?)
// ! Note this is not secure for production. OK for local dev
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

console.log(process.env.DATABASE_URL);


const db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL
        ? { connectionString: process.env.DATABASE_URL, ssl: true } // Running on Heroku
        : {
            host: '127.0.0.1',
            user: 'harrisg',
            password: '',
            database: 'autoseek_db'
        }    // Running on local
});

console.log('CONNECTING TO USERS DB', db('users'));


module.exports = db;