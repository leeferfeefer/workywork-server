const express = require('express');
var logger = require('morgan');
const initRoute = require('./routes/init.js');
var admin = require("firebase-admin");


const app = express();
const port = 3000;

// dev = :method :url :status :response-time ms - :res[content-length]

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use('/init', initRoute);

// built-in error handling
// NOTE: must be the last piece of middleware in stack
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
