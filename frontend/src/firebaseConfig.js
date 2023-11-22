// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUPJAdeNTN32MLRcHPx3D1IczJ_zZt0CQ",
  authDomain: "cloudnosql-7f4de.firebaseapp.com",
  projectId: "cloudnosql-7f4de",
  storageBucket: "cloudnosql-7f4de.appspot.com",
  messagingSenderId: "929606823658",
  appId: "1:929606823658:web:a10688401e04182277b193",
  measurementId: "G-NV52VBX11X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);