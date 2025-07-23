// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7Q80UzBdfnKLA7NX35K_vJSxqqXczr-U",
  authDomain: "farmers-connect-15bad.firebaseapp.com",
  projectId: "farmers-connect-15bad",
  storageBucket: "farmers-connect-15bad.firebasestorage.app",
  messagingSenderId: "998807400867",
  appId: "1:998807400867:web:698f9e7354b53ccdf9aa16",
  measurementId: "G-WD77JJB83W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);