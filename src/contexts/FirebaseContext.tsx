"use client";
import FirebaseService from "@/services/FirebaseService";
import React from "react";

const FirebaseContext = React.createContext<typeof FirebaseService | undefined>(
  undefined
);

export default FirebaseContext;
