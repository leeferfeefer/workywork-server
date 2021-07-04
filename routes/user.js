var express = require('express');
var router = express.Router();
var FirebaseService = require('../service/firebase.service');

router.get('/', async (req, res) => {
    const uuid = req.body.uuid;
    try {
        const user = await FirebaseService.getUser(uuid);
        res.json(user);
    } catch (error) {
        console.log('Could not user from firestore: ', error);
        res.status(500).end();
    }   
});

router.post('/timer', async (req, res) => {
    const uuid = req.body.uuid;
    const timerState = req.body.timerState;
    try {
        await FirebaseService.updateTimerState(uuid, timerState);
        res.status(200).send('Done');
    } catch (error) {
        console.log('Could not update user in firestore: ', error);
        res.status(500).end();
    }  
});

module.exports = router;
