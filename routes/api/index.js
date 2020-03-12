/**
 * Groups all api endpoints into a single router object.
 * exports said router object.
 */

const router = require('express').Router();
const eventsRouter = require('./events');
const usersRouter = require('./users');

const API = 'api';

router.use(`/${API}`, eventsRouter);
router.use(`/${API}`, usersRouter);
module.exports = router;

