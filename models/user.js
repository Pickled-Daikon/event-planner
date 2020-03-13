const mongoose = require('mongoose');
/* defines models for you - you don't need to know the query */

// create name of model for exporting
const USER = 'User';

const ID = '_id';
const EMAIL = 'email';
const PASSWORD = 'password';
const IS_ADMIN = 'isAdmin';
const FIRST_NAME = 'firstName';
const LAST_NAME = 'lastName';

const KEYS = {
  ID,
  EMAIL,
  PASSWORD,
  IS_ADMIN,
  FIRST_NAME,
  LAST_NAME,
};

const userErrors = {
  create: new Error('Failed to create user'),
  fetchUser: new Error('Failed to fetch user'),
};

// define mongoose model
const userSchema = new mongoose.Schema({
  [EMAIL]: String,
  [PASSWORD]: String,
  [IS_ADMIN]: Boolean,
  [FIRST_NAME]: String,
  [LAST_NAME]: String,
});

// create mongoose model
const MongooseModel = mongoose.model(USER, userSchema);

async function createUser(userObject) {
  const {
    email,
    password,
    isAdmin,
    firstName,
    lastName,
  } = userObject;

  const user = new MongooseModel(
    {
      email,
      password,
      isAdmin,
      firstName,
      lastName,
    },
  );

  // eslint-disable-next-line no-useless-catch
  try {
    await user.save();
    return user;
  } catch (e) {
    throw userErrors;
  }
}

async function fetchUser(email) {
  let user;
  try {
    user = await MongooseModel.findOne({ email });
    return user;
  } catch (e) {
    throw userErrors.fetchUser;
  }
}

module.exports = {
  createUser,
  fetchUser,
  USER,
  userSchema,
  userErrors,
  ...KEYS,
};
