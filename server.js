const express = require('express');
require('dotenv').config(); // allows importing .env file constants into env variables
require('./db');

/**
 * Entry point of the application.
 * Uses express for routing.
 */

const { PORT } = process.env; // env variables

// import routes
const apiRouter = require('./routes/api');

const app = express();

app.use(express.json()); // middleware for POSTing json data

// bind routes to app
app.use(apiRouter);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`app listening on port: ${PORT}`));
