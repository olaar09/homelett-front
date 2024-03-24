"use client";

import React from "react";
import FirebaseContext from "./FirebaseContext";
import { FirebaseServices } from "@/services/FirebaseService";

const FirebaseProvider: React.FC<any> = ({ children }) => {
  const firebaseServices = new FirebaseServices();
  return (
    <FirebaseContext.Provider value={firebaseServices}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
