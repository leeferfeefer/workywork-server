var admin = require("firebase-admin");

const registrationToken = process.env.FIREBASE_TOKEN;

const START_BREAK = 'START_BREAK';
const START_WORK = 'START_WORK';

const createMessage = (title, body) => ({
    notification: {
        title,
        body
    }, token: registrationToken
});

const sendMessage = (title, body) => {
    const message = createMessage(title, body);
    admin.messaging().send(message).then((response) => {    
        console.log('Successfully sent message:', response);
    }).catch((error) => {
        console.log('Error sending message:', error);
    });
};

module.exports = {
    sendMessage,
    START_BREAK,
    START_WORK
}