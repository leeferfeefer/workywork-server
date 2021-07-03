const express = require('express');
var logger = require('morgan');
const timerRoute = require('./routes/timer.js');
const tokenRoute = require('./routes/token.js');
var admin = require("firebase-admin");


const app = express();

// dev = :method :url :status :response-time ms - :res[content-length]

const logStyle = ':method :url :status :response-time ms - :res[content-length] :date';
app.use(logger(logStyle));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use('/timer', timerRoute);
app.use('/token', tokenRoute);


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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
