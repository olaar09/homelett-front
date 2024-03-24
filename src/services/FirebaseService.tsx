// Import the necessary Firebase modules
import firebase from "firebase/compat/app";
import "firebase/auth";
import AuthServices from "./AuthService";
import ProfileService from "./ProfileService";

// Firebase configuration
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
const app = firebase.initializeApp(firebaseConfig);

export class FirebaseServices {
  authService: AuthServices;
  public profileService: ProfileService;

  public firebaseInstance;

  constructor() {
    this.firebaseInstance = app;
    this.authService = new AuthServices(app);
    this.profileService = new ProfileService(app);
  }
}

// Export an instance of FirebaseServices
const firebaseServices = new FirebaseServices();
export default firebaseServices;
