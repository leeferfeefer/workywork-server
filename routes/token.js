var express = require('express');
var router = express.Router();
var FirebaseService = require('../service/firebase.service');

router.post('/', async function(req, res) {
    const token = req.body.token;
    const uuid = req.body.uuid;
    try {
        await FirebaseService.saveToken(token, uuid);
        res.status(200).send('Done');
    } catch (error) {
        console.log("Could not save token to firestore: ", error);
        res.status(500).end();
    }   
});

module.exports = router;
