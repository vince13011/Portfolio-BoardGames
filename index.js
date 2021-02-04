require('dotenv').config();

const express = require('express');

const app = express();

const port = process.env.PORT || 3698;

const bodyParser = require('body-parser');


const apiRouter = require('./app/router');


app.use(bodyParser.urlencoded({ extended: false }));


app.use('/v1', apiRouter);


app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));