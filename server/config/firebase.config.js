const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const fs = require("fs");

let serviceAccount;
if (fs.existsSync("/etc/secrets/firebase-admin-sdk.json")) {
  // For production on Render
  serviceAccount = JSON.parse(
    fs.readFileSync("/etc/secrets/firebase-admin-sdk.json", "utf8")
  );
} else {
  // For local development
  serviceAccount = require("./firebase-admin-sdk.json");
}

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const auth = getAuth();

module.exports = { app, auth };
