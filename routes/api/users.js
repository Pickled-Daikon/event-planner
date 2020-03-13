const router = require('express').Router({ mergeParams: true });

const { createUser, login, verifyToken } = require('../../controllers/users');

const PATHS = {
  USER: 'users',
  LOGIN: 'login',
  CREATE: 'create',
  VERIFY_TOKEN: 'verify',
};

router.post(`/${PATHS.USER}/${PATHS.CREATE}`, createUser);
router.post(`/${PATHS.USER}/${PATHS.LOGIN}`, login);
router.post(`/${PATHS.USER}/${PATHS.VERIFY_TOKEN}`, verifyToken);
module.exports = router;

