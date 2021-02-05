import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAHqnlREHBKEpVw5c89p2eGYIGhS57gkyM",
  authDomain: "todo-b6d8ca.firebaseapp.com",
  projectId: "todo-b6d8ca",
  storageBucket: "todo-b6d8ca.appspot.com",
  messagingSenderId: "842980265082",
  appId: "1:842980265082:web:c29ce2cb274fa146ae3fc3"
};


firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();


export function signUpWithEmailPassword(email1, pass) {
  const email = email1;
  const password = pass;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  // [END auth_signup_password]
}

export function signInWithEmailPassword(email1, pass) {
  const email = email1;
  const password = pass;
  // [START auth_signin_password]
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  // [END auth_signin_password]

}



