require('dotenv').config();
const Pool = require('pg').Pool;

const isTest = process.env.NODE_ENV === 'test';

// In a test environment, we don't need to connect to the 'db' service.
// The tests mock the pool anyway. This keeps the config simple.
const host = isTest ? 'localhost' : process.env.DB_HOST;

// For now, we will consolidate to a single database.
// The 'users' table from 'jwt_auth' and the tables from 'orders'
// should ideally be in the same database. We will use the 'orders' DB.
const database = isTest ? 'test_db' : process.env.DB_DATABASE_ORDERS;

const pool = new Pool({
    host: host,
    port: process.env.DB_PORT || 5432,
    database: database,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// We will export a single pool.
// Code that used pool_orders or pool will need to be updated to use this single pool.
module.exports = { pool };