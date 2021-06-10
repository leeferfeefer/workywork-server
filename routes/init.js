var express = require('express');
var router = express.Router();
var FirebaseService = require('../service/firebase.service');


const ONE_SECOND = 1 * 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;

let intervalTimer;
let counter = 0;


const startWork = () => {
  console.log("starting work... : " + new Date());
  FirebaseService.sendMessage(FirebaseService.START_WORK, 'Start working!!!!!!!!!');
};

const startBreak = () => {
  console.log("starting break... : " + new Date());
  FirebaseService.sendMessage(FirebaseService.START_BREAK, 'Start breaking!!!!!!!!');
};

const startTimeouts = () => {
  setTimeout(() => {
    startBreak();
    setTimeout(() => {
      startWork();
    }, 15 * ONE_MINUTE);
  }, 45 * ONE_MINUTE);
};

router.post('/', function(req, res) {
  counter = 0;

  startTimeouts();
  
  intervalTimer = setInterval(() => {
    counter++;
    startTimeouts();
    if (counter > 8) {
      clearInterval(intervalTimer);
    }
  }, ONE_HOUR);

  res.status(200).send('Done');
});

router.post('/test', function(req, res) {
  FirebaseService.sendMessage(FirebaseService.START_WORK, 'Start working!!!!!!!!!');
  res.status(200).send('Done');
});

module.exports = router;