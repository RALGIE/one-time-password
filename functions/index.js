const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./create_user').default;
const serviceAccount = require("./service_account.json");
const requestOneTimePassword = require('./require_one_time_password');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://one-time-password-b735f.firebaseio.com"
  });

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);