// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFireStore } from "@firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsUjIwcWir62nvW61q2D14OjoAQ9MVNiM",
  authDomain: "cloudcw1-405523.firebaseapp.com",
  projectId: "cloudcw1-405523",
  storageBucket: "cloudcw1-405523.appspot.com",
  messagingSenderId: "61219188493",
  appId: "1:61219188493:web:fe1c3a8ddeea7343994a44",
  measurementId: "G-LGPTYKLKBG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;
