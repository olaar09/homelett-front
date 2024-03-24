"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FirebaseContext from "./FirebaseContext";
import { message } from "antd";

interface IAuthContext {
  currentUser: firebase.User | null;
  currentUserProfile: any;
  authenticated: boolean;
  loading: boolean;
}

export const FireBaseAuthContext = createContext<IAuthContext>({
  currentUser: null,
  currentUserProfile: null,
  authenticated: false,
  loading: false,
});

export const FireBaseAuthProvider: React.FC<any> = ({ children }) => {
  const firebaseInstance = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [currentUserProfile, setCurrentUserProfile] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const authenticated = !!currentUser;
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    const unsubscribe = firebaseInstance!.authService.firebaseInstance
      .auth()
      .onAuthStateChanged(async (user) => {
        const queryParams = new URLSearchParams(params).toString();
        if (user) {
          setCurrentUser(user);
          if (path === "/") {
            router.push(`/chat${queryParams ? `?${queryParams}` : ""}`);
          }
          if (!currentUserProfile) {
            await fetchCurrentUserProfile(
              user,
              params.get("group") ?? undefined
            );
          }
        } else {
          setCurrentUserProfile(null);
          setCurrentUser(null);
          if (path !== "/") {
            router.push(`/${queryParams ? `?${queryParams}` : ""}`);
          }
        }
      });

    return () => unsubscribe();
  }, [router]);

  const fetchCurrentUserProfile = async (
    user: firebase.User,
    group?: string
  ) => {
    try {
      setLoading(true);
      let profile;
      profile = await firebaseInstance!.profileService.fetchProfile(user.uid);
      if (!profile) {
        let data;
        if (group) {
          data = {
            uid: user.uid,
            subscribedSubjects: [],
            groupId: group,
            user: user,
          };
        } else {
          data = {
            uid: user.uid,
            subscribedSubjects: [],
            user: {
              email: user.email,
              displayName: user.displayName,
              uid: user.uid,
            } as firebase.User,
          };
        }
        profile = await firebaseInstance!.profileService.addOrUpdateProfile(
          data
        );
      }
      setCurrentUserProfile(profile);
    } catch (error) {
      message.error("An error occurred while fetching profile");
      // call bugsnag
    } finally {
      setLoading(false);
    }
  };

  return (
    <FireBaseAuthContext.Provider
      value={{ loading, currentUser, authenticated, currentUserProfile }}
    >
      {children}
    </FireBaseAuthContext.Provider>
  );
};

export const useAuth = () => useContext(FireBaseAuthContext);
