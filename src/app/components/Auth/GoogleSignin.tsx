"use client";
import React, { useContext } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import FirebaseContext from "@/contexts/FirebaseContext";
import "firebase/auth";

const GoogleSignIn = () => {
  const firebaseContext = useContext(FirebaseContext);

  return (
    <button
      className=" flex items-center  justify-center gap-x-3 bg-foreground text-xl rounded-3xl text-foreground py-3 px-6 w-full"
      onClick={() => firebaseContext!.authService.signInWithGoogle()}
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
