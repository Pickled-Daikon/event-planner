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
  IS_ADMIN,
  FIRST_NAME,
  LAST_NAME,
} = User;

/*
Error messages that may be returned in http body.
Messages are more explicit then they need to be for
the purpose of debugging.
*/

const ERROR_TYPES = {
  UNDEFINED: 'UNDEFINED',
  MISSING_PARAMS: 'MISSING_PARAMS',
  USER_EXISTS: 'USER_EXISTS',
  PW_HASH_FAILED: 'PW_HASH_FAILED',
  INSERT_QUERY_FAILED: 'INSERT_QUERY_FAILED',
  TOKEN_SIGN_FAILED: 'TOKEN_SIGN_FAILED',
  NO_USER_FOUND: 'NO_USER_FOUND',
  PW_COMPARE_FAILED: 'PW_COMPARE_FAILED',
  INVALID_TOKEN: 'INVALID_TOKEN',
};

const ERR_MSGS = {
  [ERROR_TYPES.UNDEFINED]: 'An undefined server error has occurred.',
  [ERROR_TYPES.MISSING_PARAMS]: 'Missing params, make sure email and password is included in post body',
  [ERROR_TYPES.USER_EXISTS]: 'A user with the given email address already exists',
  [ERROR_TYPES.PW_HASH_FAILED]: 'Failed to hash password',
  [ERROR_TYPES.INSERT_QUERY_FAILED]: 'Failed to insert user into the database',
  [ERROR_TYPES.TOKEN_SIGN_FAILED]: 'Failed to tokenize user',
  [ERROR_TYPES.NO_USER_FOUND]: 'No user was found with given email and password',
  [ERROR_TYPES.PW_COMPARE_FAILED]: 'Failed to compare password hash',
  [ERROR_TYPES.INVALID_TOKEN]: 'Invalid Token',
};


// helper function for tokenizing a user using jwt
async function tokenizeUser(user) {
  // eslint-disable-next-line no-useless-catch
  const plainUser = {
    [ID]: user[ID],
    [EMAIL]: user[EMAIL],
    [PASSWORD]: user[PASSWORD],
    [IS_ADMIN]: user[IS_ADMIN],
    [FIRST_NAME]: user[FIRST_NAME],
    [LAST_NAME]: user[LAST_NAME],
  };

  // eslint-disable-next-line no-useless-catch
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
    isAdmin,
    firstName,
    lastName,
  } = req.body;


  // eslint-disable-next-line no-restricted-syntax
  for (let param of [email, password, firstName, lastName]) {
    if (param === '' || param === undefined) {
      return res.status(400).json({
        errorMsg: ERR_MSGS.MISSING_PARAMS
      });
    }
  }

  if (!(isAdmin !== 'True' && isAdmin !== 'False')) {
    return res.status(400).json({ errorMsg: ERR_MSGS.MISSING_PARAMS });
  }

  // find user with same email
  try {
    const existingUser = await User.fetchUser(email);
    if (existingUser !== null) {
      return res.status(400).json({ errorMsg: ERR_MSGS.USER_EXISTS });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return res.status(400).json({ errorMsg: ERR_MSGS.UNDEFINED });
  }
  let hashedPassword = '';

  try {
    hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  } catch (e) {
    return res.status(400).json({ errorMsg: ERR_MSGS.PW_HASH_FAILED });
  }
  let createdUser;

  try {
    createdUser = await User.createUser({
      email,
      password: hashedPassword,
      isAdmin: Boolean(isAdmin),
      firstName,
      lastName,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return res.status(400).json({ errorMsg: ERR_MSGS.UNDEFINED });
  }

  try {
    const tokenizedUser = await tokenizeUser(createdUser);
    return res.status(200).json({ jwtToken: tokenizedUser });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ errorMsg: ERR_MSGS.TOKEN_SIGN_FAILED });
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

  // eslint-disable-next-line no-restricted-syntax
  for (let param of [email, password]) {
    if (param === '' || param === undefined) {
      return res.status(400).json({
        error: ERROR_TYPES.MISSING_PARAMS,
        errorMsg: ERR_MSGS.MISSING_PARAMS,
      });
    }
  }

  try {
    foundUser = await User.fetchUser(email);
    if (foundUser === null) {
      return res.status(400).json({
        error: ERROR_TYPES.NO_USER_FOUND,
        errorMsg: ERR_MSGS.NO_USER_FOUND,
      });
    }
  } catch (e) {
    return res.status(400).json({
      eror: ERROR_TYPES.UNDEFINED,
      errorMsg: ERR_MSGS.UNDEFINED,
    });
  }

  try {
    const pwMatch = bcrypt.compare(password, foundUser[User.PASSWORD]);
    if (!pwMatch) {
      return res.status(400).json({
        error: ERROR_TYPES.NO_USER_FOUND,
        errorMsg: ERR_MSGS.NO_USER_FOUND,
      });
    }
  } catch (e) {
    return res.status(400).json({
      error: ERROR_TYPES.PW_COMPARE_FAILED,
      errorMsg: ERR_MSGS.PW_COMPARE_FAILED,
    });
  }

  try {
    const tokenizedUser = await tokenizeUser(foundUser);
    return res.status(200).json({ jwtToken: tokenizedUser });
  } catch (e) {
    return res.status(400).json({
      error: ERROR_TYPES.TOKEN_SIGN_FAILED,
      errorMsg: ERR_MSGS.TOKEN_SIGN_FAILED,
    });
  }
}

async function verifyToken(req, res) {
  const token = req.body.jwtToken;
  try {
    await jwt.verify(token, JWT_KEY);
    return res.status(200).json({ jwtToken: token });
  } catch (e) {
    return res.status(400).json({
      eror: ERROR_TYPES.INVALID_TOKEN,
      errorMsg: ERR_MSGS.INVALID_TOKEN,
    });
  }
}

module.exports = {
  createUser,
  verifyToken,
  login,
};
