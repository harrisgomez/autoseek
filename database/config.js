const knex = require('knex');

// ! Resolves 'Error: self signed certificate' caused by 'SSL: true'. May have to do w/ free heroku acc(?)
// ! Note this is not secure for production. OK for local dev
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

let config;

if (process.env.DATABASE_URL) {
    config = {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    };
} else {
    config = 'postgres://postgres:test@localhost:5432/facefacts_db';
}

const db = knex({
    client: 'pg',
    connection: config
});

module.exports = db;