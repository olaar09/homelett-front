"use client";
import React from "react";
import { auth } from "../../../utils/firebaseConfig"; // Adjust the path as necessary
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const GoogleSignin = () => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      // The signed-in user info.
      const user = result.user;
      // You can now use this to authenticate with your backend or just use it client-side
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

export default GoogleSignin;
