import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAu23g6dO5DZQfO2Ke8Ywxz7glPxWCu-2w",
  authDomain: "planup-d79a0.firebaseapp.com",
  projectId: "planup-d79a0",
  storageBucket: "planup-d79a0.appspot.com",
  messagingSenderId: "422174048824",
  appId: "1:422174048824:web:6c031ff1ee5c0beb625ccd",
  measurementId: "G-FR3K9D10LQ"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();
const auth=firebase.auth();
export {auth};