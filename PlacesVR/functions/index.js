const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// exports.updateCounter = functions.https.onRequest((request, response) => {
//   admin
//     .firestore()
//     .collection("count")
//     .doc("clicks")
//     .set({
//       val: request.body.val ? request.body.val : 10,
//     })
//     .then(() => {
//       //   console.log("user added to db: ", data.profile.email);
//       response.send("incremented counter success");
//     })
//     .catch(() => console.log("error incrementing counter"));
// });

exports.createNewUser = functions.https.onRequest((request, response) => {
  admin
    .firestore()
    .collection("users")
    .doc(request.body.email ? request.body.email : "invalid entry")
    .set({
      profile: {
        email: request.body.email ? request.body.email : "invalid entry",
        name: request.body.name ? request.body.name : "invalid entry",
      },
    })
    .then(() => {
      response.send("SERVER: added user data to db!");
    })
    .catch(() => console.log("SERVER: failed to add user data to db"));
});

// exports.getCounter = functions.https.onRequest((request, response) => {
//   admin
//     .firestore()
//     .collection("count")
//     .doc("clicks")
//     .get()
//     .then((resp) => {
//       response.set({
//         currentVal: resp.val,
//       });
//       response.send("current counter value sent");
//     })
//     .catch(() => console.log("error getting counter value"));
// });
