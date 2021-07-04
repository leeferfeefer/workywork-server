var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

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
    },
    android: {
        priority: 'high' 
    }
});

const db = admin.firestore().collection(COLLECTION);

const sendMessage = async (title, body) => {
    try {
        const message = createMessage(title, body);
        const users = await getUsers();
        let promises = [];
        users.forEach(user => promises.push(admin.messaging().send({...message, token: user.token})));
        const responses = await Promise.all(promises);
        console.log('Successfully sent message:', responses);
    } catch (error) {
        console.log('Error sending message:', error);
        throw error;
    }
};

const getUsers = async () => {
    const usersRef = await db.get();
    return usersRef.docs.map(doc => doc.data());
};

const _getUserRef = async (uuid) => {
    return await db.doc(uuid).get();    
};

const getUser = async (uuid) => {
    const userRef = await _getUserRef(uuid);
    if (userRef.exists) {
        return userRef.data();
    } else {
        throw new Error('User does not exist!');
    }
};

const saveToken = async (uuid, token) => {
    const userRef = await _getUserRef(uuid);
    if (userRef.exists) {
        await db.doc(uuid).update({token});
    } else {
        await db.doc(uuid).set({token});
    }
};

const updateTimerState = async (uuid, timerState) => {
    const userRef = await _getUserRef(uuid);
    if (userRef.exists) {
        await db.doc(uuid).update({timerState});
    } else {
        await db.doc(uuid).set({timerState});
    }
};

module.exports = {
    sendMessage,
    START_BREAK,
    START_WORK,
    getUsers,
    getUser,
    saveToken,
    updateTimerState
}