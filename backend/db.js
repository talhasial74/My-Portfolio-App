const mysql = require('mysql2/promise');
require('dotenv').config();

// A connection pool is reused across requests instead of opening
// a new MySQL connection every time, which is what you want in
// a request/response server like this one.
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
