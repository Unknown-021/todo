import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
import 'firebase/storage';

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




