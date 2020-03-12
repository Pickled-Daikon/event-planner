const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SALT_ROUNDS = 10;
const JWT_EXPIRATION = '7d';

const { JWT_KEY } = process.env;

// prop keys for User object.
const {
  ID,
  EMAIL,
  PASSWORD,
} = User;

/*
Error messages that may be returned in http body.
Messages are more explicit then they need to be for
the purpose of debugging.
*/
const ERR_MSGS = {
  UNDEFINED: 'An undefined server error has occurred.',
  MISSING_PARAMS: 'Missing params, make sure email and password is included in post body',
  USER_EXISTS: 'A user with the given email address already exists',
  PW_HASH_FAILED: 'Failed to hash password',
  INSERT_QUERY_FAILED: 'Failed to insert user into the database',
  TOKEN_SIGN_FAILED: 'Failed to tokenize user',
  NO_USER_FOUND: 'No user was found with given email and password',
  PW_COMPARE_FAILED: 'Failed to compare password hash',
};


// helper function for tokenizing a user using jwt
async function tokenizeUser(user) {
  // eslint-disable-next-line no-useless-catch
  const plainUser = {
    [ID]: user[ID],
    [EMAIL]: user[EMAIL],
    [PASSWORD]: user[PASSWORD],
  };

  try {
    return await jwt.sign(plainUser, JWT_KEY, { expiresIn: JWT_EXPIRATION });
  } catch (e) {
    throw (e);
  }
}

/**
 * Creates a user.
 * First, checks if required params exists.
 *
 * Then, try and get a user with the same email as the one submitted.
 * If one exists, then return an error.
 *
 * Then, hash the given password.
 *
 * finally, return a User object that is tokenized using JWT.
 *
 * @param {*} req
 * @param {*} res
 * @returns {Promise<*>}
 */
async function createUser(req, res) {
  const {
    email,
    password,
    admin,
  } = req.body;

  if (email === '' || email === undefined) {
    return res.status(400).json({ error: ERR_MSGS.MISSING_PARAMS });
  }

  if (password === '' || password === undefined) {
    return res.status(400).json({ error: ERR_MSGS.MISSING_PARAMS });
  }

  // find user with same email
  try {
    const existingUser = await User.fetchUser(email);
    if (existingUser !== null) {
      return res.status(400).json({ error: ERR_MSGS.USER_EXISTS });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return res.status(400).json({ error: ERR_MSGS.UNDEFINED });
  }
  let hashedPassword = '';

  try {
    hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  } catch (e) {
    return res.status(400).json({ error: ERR_MSGS.PW_HASH_FAILED });
  }
  let createdUser;

  try {
    createdUser = await User.createUser({
      email,
      password: hashedPassword,
      admin: Boolean(admin),
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return res.status(400).json({ error: ERR_MSGS.UNDEFINED });
  }

  try {
    const tokenizedUser = await tokenizeUser(createdUser);
    return res.status(200).json({ user: tokenizedUser });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: ERR_MSGS.TOKEN_SIGN_FAILED });
  }
}


/**
 * Attempts to login a given user.
 *
 * First, checks that params are not empty.
 *
 * Then, find a user with a given email.
 *
 * Then, Check that the passwords match.
 *
 * Then, created a token with the found User object, and return token.
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function login(req, res) {
  const { email, password } = req.body;
  let foundUser;

  if (email === '' || email === undefined) {
    return res.status(400).json({ error: ERR_MSGS.MISSING_PARAMS });
  }

  if (password === '' || password === undefined) {
    return res.status(400).json({ error: ERR_MSGS.MISSING_PARAMS });
  }


  try {
    foundUser = await User.fetchUser(email);
    if (foundUser === null) {
      return res.status(400).json({ error: ERR_MSGS.NO_USER_FOUND });
    }
  } catch (e) {
    return res.status(400).json({ error: ERR_MSGS.UNDEFINED });
  }

  console.log(foundUser);
  try {
    const pwMatch = bcrypt.compare(password, foundUser[User.PASSWORD]);
    if (!pwMatch) {
      return res.status(400).json({ error: ERR_MSGS.NO_USER_FOUND });
    }
  } catch (e) {
    return res.status(400).json({ error: ERR_MSGS.PW_COMPARE_FAILED });
  }

  try {
    const tokenizedUser = await tokenizeUser(foundUser);
    return res.status(200).json({ user: tokenizedUser });
  } catch (e) {
    return res.status(400).json({ error: ERR_MSGS.TOKEN_SIGN_FAILED });
  }
}


module.exports = {
  createUser,
  login,
};
