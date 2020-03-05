const mongoose = require('mongoose');
/* defines models for you - you don't need to know the query */

// create name of model for exporting
const USER = 'User';

// define model
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  username: String,
  admin: Boolean,
});

// create model
const MongooseModel = mongoose.model(USER, userSchema);

async function createUser(userObject) {
  const { firstName, lastName, email, password, username, admin} = userObject;
  const user = new MongooseModel(
    {
      firstName,
      lastName,
      email,
      password,
      username,
      admin,
    }
  );

  // eslint-disable-next-line no-useless-catch
  try {
    await user.save();
    return user;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  createUser,
  USER,
  userSchema,
};
