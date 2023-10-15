import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/database';

export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCgjfF2xkrzADuNsv0OnmQ5s0m7UhUlqdc",
    authDomain: "skincare-8707c.firebaseapp.com",
    databaseURL: "https://skincare-8707c-default-rtdb.firebaseio.com/",
    projectId: "skincare-8707c",
    storageBucket: "skincare-8707c.appspot.com",
    messagingSenderId: "339830433469",
    appId: "1:339830433469:web:e9609c413c8fb86ad4f9d4"
  }
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
  else {
    firebase.app(); // if already initialized, use that one
  }

  
  firebase.firestore();
  
  export default firebase;
