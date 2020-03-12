const router = require('express').Router({ mergeParams: true });

const { createUser, login } = require('../../controllers/users');

const PATHS = {
  USER: 'users',
  LOGIN: 'login',
  CREATE: 'create',
};

router.post(`/${PATHS.USER}/${PATHS.CREATE}`, createUser);
router.post(`/${PATHS.USER}/${PATHS.LOGIN}`, login);
module.exports = router;
