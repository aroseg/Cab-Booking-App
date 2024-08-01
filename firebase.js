// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsKFGYZfC8S6jRnsBYinfj89fLO1u4vHY",
  authDomain: "cab-booking-app-6e12a.firebaseapp.com",
  projectId: "cab-booking-app-6e12a",
  storageBucket: "cab-booking-app-6e12a.appspot.com",
  messagingSenderId: "763982220957",
  appId: "1:763982220957:web:846ee949ca1eb44097ce74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

export { firestore };
