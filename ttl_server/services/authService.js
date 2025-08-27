const { pool } = require('../db');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator');

class AuthError extends Error {
  constructor(message, statusCode = 401) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = statusCode;
  }
}

const registerUser = async (userName, password) => {
  // 1. Check if user exists
  const user = await pool.query('SELECT user_name FROM users WHERE user_name = $1', [userName]);
  if (user.rows.length !== 0) {
    throw new AuthError('User already exists');
  }

  // 2. Encrypt password
  const salt = await bcrypt.genSalt(10);
  const bcryptPassword = await bcrypt.hash(password, salt);

  // 3. Create new user
  const newUser = await pool.query(
    'INSERT INTO users (user_name, user_password) VALUES ($1, $2) RETURNING user_id',
    [userName, bcryptPassword]
  );

  // 4. Generate and return token
  const token = jwtGenerator(newUser.rows[0].user_id);
  return { accessToken: token };
};

const loginUser = async (userName, password) => {
    // 1. Check if user exists
    const user = await pool.query('SELECT * FROM users WHERE user_name = $1', [userName]);
    if (user.rows.length === 0) {
        throw new AuthError('Username incorrect');
    }

    // 2. Validate password
    const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
    if (!validPassword) {
        throw new AuthError('Password incorrect');
    }

    // 3. Generate and return token
    const token = jwtGenerator(user.rows[0].user_id);
    return { accessToken: token };
};

module.exports = {
  registerUser,
  loginUser,
  AuthError,
};
