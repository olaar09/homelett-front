"use client";
import React, { useContext } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import FirebaseContext from "@/contexts/FirebaseContext";
import "firebase/auth";
import { useSearchParams } from "next/navigation";
const GoogleSignIn = () => {
  const query = useSearchParams();

  const firebaseContext = useContext(FirebaseContext);

  const onContinueWithGMail = () => {
    if (query.get("is_new") === "true") {
      firebaseContext!.authService.signInWithGoogle();
    } else {
      firebaseContext!.authService.signInWithGoogle();
    }
  };
  return (
    <button
      className=" flex items-center  justify-center gap-x-3 bg-foreground-inverted text-xl rounded-3xl text-foreground py-3 px-6 w-full ring-1"
      onClick={onContinueWithGMail}
    >
      <Icon className="text-lg " icon={"flat-color-icons:google"} />
      <span className="text-foreground text-sm text-center block flex-grow">
        {" "}
        Continue With Google
      </span>
    </button>
  );
};

export default GoogleSignIn;
