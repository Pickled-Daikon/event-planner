const router = require('express').Router({ mergeParams: true });

const { createUser } = require('../../controllers/users');

const PATHS = {
  USER: 'users',
  GET: 'get',
  CREATE: 'create',
};

router.post(`/${PATHS.USER}/${PATHS.CREATE}`, createUser);

module.exports = router;
