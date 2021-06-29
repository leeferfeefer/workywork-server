var admin = require("firebase-admin");

const START_BREAK = 'START_BREAK';
const START_WORK = 'START_WORK';
const COLLECTION = 'users';

//TODO: Fill this out and use
const BREAK_TITLE = '';
const BREAK_MESSAGE = '';
const WORK_TITLE = '';
const WORK_MESSAGE = '';

const createMessage = (title, body) => ({
    notification: {
        title,
        body
    }
});

const sendMessage = async (title, body) => {
    try {
        const message = createMessage(title, body);
        const users = await getUsers();
        let promises = [];
        users.forEach(user => promises.push(admin.messaging().sendToDevice(user.token, message)));
        const responses = await Promise.all(promises);
        console.log('Successfully sent message:', responses);
    } catch (error) {
        console.log('Error sending message:', error);
        throw error;
    }
};

const getUsers = async () => {
    const snapshot = await admin.firestore().collection(COLLECTION).get();
    return snapshot.docs.map(doc => doc.data());
};

const saveToken = async (token, uuid) => {
    await admin.firestore().collection(COLLECTION).doc(uuid).set({token});
};

module.exports = {
    sendMessage,
    START_BREAK,
    START_WORK,
    getUsers,
    saveToken
}