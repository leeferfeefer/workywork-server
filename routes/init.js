var express = require('express');
var router = express.Router();
var FirebaseService = require('../service/firebase.service');


const ONE_SECOND = 1 * 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;

let intervalTimer;
let counter = 0;

const startTimeouts = () => {
  setTimeout(() => {
    FirebaseService.sendMessage(FirebaseService.START_WORK, 'Start working!!!!!!!!!');
    setTimeout(() => {
      FirebaseService.sendMessage(FirebaseService.START_BREAK, 'Start breaking!!!!!!!!');
    }, 10 * ONE_MINUTE);
  }, 50 * ONE_MINUTE);
};

router.post('/', function(req, res) {
  try {
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
  } catch (error) {
    console.log("Error in initialization: ", error);
    res.status(500).end();
  }
});

router.post('/test', async function(req, res) {
  try {
    await FirebaseService.sendMessage(FirebaseService.START_WORK, 'Start working!!!!!!!!!');
    res.status(200).send('Done');
  } catch (error) {
    console.log("Error sending message: ", error);
    res.status(500).end();
  }
});

module.exports = router;
