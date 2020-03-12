const mongoose = require('mongoose');
/* defines models for you - you don't need to know the query */

// create name of model for exporting
const USER = 'User';

const ID = '_id';
const EMAIL = 'email';
const PASSWORD = 'password';
const IS_ADMIN = 'isAdmin';

const KEYS = {
  ID,
  EMAIL,
  PASSWORD,
  IS_ADMIN,
};

const userErrors = {
  create: new Error('Failed to create user'),
  fetchUser: new Error('Failed to fetch user'),
};


// define mongoose model
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  isAdmin: Boolean,
});

// create mongoose model
const MongooseModel = mongoose.model(USER, userSchema);

async function createUser(userObject) {
  const {
    email,
    password,
    isAdmin,
  } = userObject;

  const user = new MongooseModel(
    {
      email,
      password,
      isAdmin,
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
