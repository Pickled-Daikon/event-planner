const userModel = require('../models/user');

async function createUser(req, res) {
  const {
    firstName,
    lastName,
    email,
    password,
    username,
    admin,
  } = req.body;

  let createdUser;

  try {
    createdUser = await userModel.createUser({
      firstName,
      lastName,
      email,
      password,
      username,
      admin: Boolean(admin),
    });


  } catch (e) {
    return res.status(400).body({ user: createdUser });
  }
}

module.exports = {
  createUser,
};

