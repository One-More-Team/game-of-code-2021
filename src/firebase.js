import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";
import "@firebase/firestore";
import ReduxSagaFirebase from "redux-saga-firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCUV6ULP0MBTKbOk7MJ6rYDMcSNmkMoat0",
  authDomain: "game-of-code-2021.firebaseapp.com",
  databaseURL:
    "https://game-of-code-2021-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "game-of-code-2021",
  storageBucket: "game-of-code-2021.appspot.com",
  messagingSenderId: "148524092971",
  appId: "1:148524092971:web:64bdbd06308f8c4eae246e",
  measurementId: "G-2CLTJC0N8F",
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const rsf = new ReduxSagaFirebase(firebase);
