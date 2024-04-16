const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");

var serviceAccount = require("../config/firebase-admin-sdk.json");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const auth = getAuth();

module.exports = { app, auth };
