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

  userModel.createUser({
    firstName,
    lastName,
    email,
    password,
    username,
    admin,
  })
}
