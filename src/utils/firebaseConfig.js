// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyBAcsgxKXX1TlohPFs5jd6sHbbbOSD-oCU",
  authDomain: "bubble-80a8f.firebaseapp.com",
  databaseURL:
    "https://bubble-80a8f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bubble-80a8f",
  storageBucket: "bubble-80a8f.appspot.com",
  messagingSenderId: "427269138488",
  appId: "1:427269138488:web:f5a9407acdc34e69949ecd",
  measurementId: "G-64QSGZLY95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
