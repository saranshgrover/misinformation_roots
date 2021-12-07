const functions = require("firebase-functions");
global.fetch = require("node-fetch");
const admin = require('firebase-admin');
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

function makeRequest(url) {
    return fetch(url)
            .then((response) => {
                console.log(url);
                if(!response.ok)
                {
                    console.log("HTTP ERROR Status: " + response.status + " Error: " +   response.statusText);
                }
                return response.json();
            })
            .then((json) =>  {
                if('error' in json)
                {
                    console.log(JSON.stringify(json.error));
                    throw new Error(json.error.message);
                }
                return json;
            })
            .catch(error => console.log(error));
}

exports.helloWorld = functions.https.onRequest((request, response) => {
    async function getTweet()
    {
      let url = "";
      var data = makeRequest(url);
      console.log(data);
    }
    return getTweet();
});

// exports.addMessage = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into Firestore using the Firebase Admin SDK.
//   const writeResult = await admin.firestore().collection('messages').add({original: original});
//   // Send back a message that we've successfully written the message
//   res.json({result: `Message with ID: ${writeResult.id} added.`});
// });
//
// exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
//     .onCreate((snap, context) => {
//       // Grab the current value of what was written to Firestore.
//       const original = snap.data().original;
//
//       // Access the parameter `{documentId}` with `context.params`
//       functions.logger.log('Uppercasing', context.params.documentId, original);
//
//       const uppercase = original.toUpperCase();
//
//       // You must return a Promise when performing asynchronous tasks inside a Functions such as
//       // writing to Firestore.
//       // Setting an 'uppercase' field in Firestore document returns a Promise.
//       return snap.ref.set({uppercase}, {merge: true});
//     });
