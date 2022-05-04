'use strict';

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./assets/firebase_creds.json');
const {
    FIREBASE_URL,
    FIREBASE_PRIVATE_KEY_ID,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_ID,
    FIREBASE_CLIENT_EMAIL,
} = require('../env');

module.exports = function createFirebase() {
    const account = {
        ...serviceAccount,
        private_key_id: FIREBASE_PRIVATE_KEY_ID,
        private_key: FIREBASE_PRIVATE_KEY ? FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
        client_email: FIREBASE_CLIENT_EMAIL,
        client_id: FIREBASE_CLIENT_ID,
    };

    // TODO: Do we really want to keep running if we can't connect to Firebase?
    if (serviceAccount.private_key_id) {
        initializeApp({
            databaseURL: FIREBASE_URL,
            credential: cert(account),
        });
        // TODO: Remove global in favour of paramatic modules
        global.db = getFirestore();
    }
};
