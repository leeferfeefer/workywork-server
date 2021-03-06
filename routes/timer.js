var express = require('express');
var router = express.Router();
var FirebaseService = require('../service/firebase.service');


const ONE_SECOND = 1 * 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;

const TIMER_ALREADY_STARTED = "TIMER_ALREADY_STARTED";
const TIMER_ALREADY_STOPPED = "TIMER_ALREADY_STOPPED";

let intervalTimer;
let breakTimer;
let workTimer;
let counter = 0;

const startTimeouts = () => {
  breakTimer = setTimeout(() => {
    FirebaseService.sendMessage(FirebaseService.START_BREAK, 'Start breaking!!!!!!!!');
    workTimer = setTimeout(() => {
      FirebaseService.sendMessage(FirebaseService.START_WORK, 'Start working!!!!!!!!!');
    }, 10 * ONE_MINUTE);
  }, 50 * ONE_MINUTE);
};

router.post('/start', function(req, res) {
  try {
    if (intervalTimer) {
      res.status(500).send(TIMER_ALREADY_STARTED);
      return;
    }
    const uuid = req.body.uuid;
    if (uuid === undefined) {
      res.status(422).end();
      return;
    }
    FirebaseService.updateTimerState(uuid, true);

    counter = 0;

    startTimeouts();
  
    intervalTimer = setInterval(() => {
      counter++;
      startTimeouts();
      if (counter > 8) {
        clearInterval(intervalTimer);
        intervalTimer = undefined;
      }
    }, ONE_HOUR);
  
    res.status(200).send('Done');
  } catch (error) {
    console.log("Error in timer start: ", error);
    res.status(500).end();
  }
});

router.post('/stop', function(req, res) {
  try {
    if (!intervalTimer) {
      res.status(500).send(TIMER_ALREADY_STOPPED);
      return;
    }
    const uuid = req.body.uuid;
    if (uuid === undefined) {
      res.status(422).end();
      return;
    }
    FirebaseService.updateTimerState(uuid, false);

    clearInterval(intervalTimer);
    clearTimeout(breakTimer);
    clearTimeout(workTimer);
    intervalTimer = undefined;
    breakTimer = undefined;
    workTimer = undefined;
    
    res.status(200).send('Done');
  } catch (error) {
    console.log("Error in timer stop: ", error);
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
