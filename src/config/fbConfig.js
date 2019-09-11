import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import 'firebase/storage';


var config = {
  apiKey: "AIzaSyAzzRGnQXaBoFF9uJnEXRmWPeg91_wSpMY",
  authDomain: "keep-be68c.firebaseapp.com",
  databaseURL: "https://keep-be68c.firebaseio.com",
  projectId: "keep-be68c",
  storageBucket: "keep-be68c.appspot.com",
  messagingSenderId: "1046598729377",
  appId: "1:1046598729377:web:43bcad6a311acbe1"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

const storage = firebase.storage();

export {
  storage, firebase as default
} 