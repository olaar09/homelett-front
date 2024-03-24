import {
  GoogleAuthProvider,
  signInWithRedirect,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default class AuthServices {
  public firebaseInstance;
  constructor(firebaseInstance: firebase.app.App) {
    console.log("I AM HERE", firebaseInstance.auth);
    this.firebaseInstance = firebaseInstance;
  }

  signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(getAuth(), provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      console.log("Google signin successful", token);
      // The signed-in user info.
      //  const user = result.user;
      // You can now use this to authenticate with your backend or just use it client-side
      // console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  async signUpWithPassword(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    try {
      await this.firebaseInstance
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const userCredential = await this.loginWithPassword(email, password);
      console.log("User logged in successfully:", userCredential.user);
      return userCredential;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  // Method to log in with email and password
  async loginWithPassword(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    try {
      const userCredential = await this.firebaseInstance
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log("User logged in successfully:", userCredential.user);
      return userCredential;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  // Method to log out
  async logout(): Promise<void> {
    try {
      await this.firebaseInstance.auth().signOut();
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }
}
