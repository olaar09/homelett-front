"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import FirebaseContext from "./FirebaseContext";

interface IAuthContext {
  currentUser: firebase.User | null;
  authenticated: boolean;
}

const FireBaseAuthContext = createContext<IAuthContext>({
  currentUser: null,
  authenticated: false,
});

export const FireBaseAuthProvider: React.FC<any> = ({ children }) => {
  const firebase = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [currentUserProfile, setCurrentUserProfile] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const authenticated = !!currentUser;
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const unsubscribe = firebase!.authService.firebaseInstance
      .auth()
      .onAuthStateChanged((user) => {
        console.log("STATE CHANGE", user);
        if (user) {
          setCurrentUser(user);
          if (path === "/") {
            router.push("/chat/1");
          }
        } else {
          setCurrentUser(null);
          if (path !== "/login") {
            router.push("/");
          }
        }
      });

    return () => unsubscribe();
  }, [router]);

  return (
    <FireBaseAuthContext.Provider value={{ currentUser, authenticated }}>
      {children}
    </FireBaseAuthContext.Provider>
  );
};

export const useAuth = () => useContext(FireBaseAuthContext);
