"use client";
import React from "react";
import { auth } from "../../../utils/firebaseConfig"; // Adjust the path as necessary
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Icon } from "@iconify/react/dist/iconify.js";

const GoogleSignIn = () => {
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

  return (
    <button
      className=" flex items-center  justify-center gap-x-3 bg-foreground text-xl rounded-3xl text-foreground py-3 px-6 w-full"
      onClick={signInWithGoogle}
    >
      <Icon className="text-lg " icon={"flat-color-icons:google"} />
      <span className="text-foreground-inverted text-sm text-center block flex-grow">
        {" "}
        Continue with Google
      </span>
    </button>
  );
};

export default GoogleSignIn;
