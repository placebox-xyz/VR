// import * as firebase from 'firebase/firebase';
// import 'firebase/firestore';
// var config = {
//   apiKey: "AIzaSyAqvRraXy8jJy35JKxS9T9_Wx5VdQErgJE",
//   authDomain: "placesvr-3d707.firebaseapp.com",
//   databaseURL: "https://placesvr-3d707.firebaseio.com",
//   projectId: "placesvr-3d707",
//   storageBucket: "placesvr-3d707.appspot.com",
//   messagingSenderId: "729487849362",
//   appId: "1:729487849362:web:c6c6305d542a3f9030734b",
//   measurementId: "G-NPEBP42SDV",
// };

// const fire = firebase.initializeApp(config);

// export default fire;


import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyAqvRraXy8jJy35JKxS9T9_Wx5VdQErgJE",
  authDomain: "placesvr-3d707.firebaseapp.com",
  databaseURL: "https://placesvr-3d707.firebaseio.com",
  projectId: "placesvr-3d707",
  storageBucket: "placesvr-3d707.appspot.com",
  messagingSenderId: "729487849362",
  appId: "1:729487849362:web:c6c6305d542a3f9030734b",
  measurementId: "G-NPEBP42SDV",
};

const fire = firebase.initializeApp(config);

export default fire;






// full script:
//   <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyAqvRraXy8jJy35JKxS9T9_Wx5VdQErgJE",
//     authDomain: "placesvr-3d707.firebaseapp.com",
//     databaseURL: "https://placesvr-3d707.firebaseio.com",
//     projectId: "placesvr-3d707",
//     storageBucket: "placesvr-3d707.appspot.com",
//     messagingSenderId: "729487849362",
//     appId: "1:729487849362:web:c6c6305d542a3f9030734b",
//     measurementId: "G-NPEBP42SDV"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>