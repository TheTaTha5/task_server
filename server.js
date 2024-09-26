const express = require('express'); // Import Express
const app = express();               // Create an Express application
const PORT = process.env.PORT || 3000; // Set the port
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!'); // Send a response
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});

exports.sendPushNotification = functions.https.onRequest((req, res) => {
    const message = {
        notification: {
            title: "New Task",
            body: "You have a new task assigned!",
        },
        token: req.body.token, // Token of the device to send the notification to
    };

    admin.messaging().send(message)
        .then((response) => {
            res.status(200).send("Notification sent successfully: " + response);
        })
        .catch((error) => {
            res.status(500).send("Error sending notification: " + error);
        });
});