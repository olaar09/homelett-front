import {
  GoogleAuthProvider,
  signInWithRedirect,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default class ProfileServices {
  public firebaseInstance;
  constructor(firebaseInstance: firebase.app.App) {
    this.firebaseInstance = firebaseInstance;
  }
}
