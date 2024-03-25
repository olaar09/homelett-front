"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FirebaseContext from "./FirebaseContext";
import { message } from "antd";
import { IProfile } from "@/app/interfaces/IProfile";
import APIService from "@/services/APIService";
import APIUtil from "@/services/APIUtil";

interface IAuthContext {
  refreshProfile: () => Promise<void>;
  updateChat: (chatId: string) => Promise<void>;
  currentUser: firebase.User | null;
  currentUserProfile?: IProfile | null;
  authenticated: boolean;
  loading: boolean;
}

export const FireBaseAuthContext = createContext<IAuthContext>({
  currentUser: null,
  currentUserProfile: null,
  authenticated: false,
  loading: true,
  updateChat: async (chatId: string) => {},
  refreshProfile: async () => {},
});

export const FireBaseAuthProvider: React.FC<any> = ({ children }) => {
  const firebaseInstance = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [currentUserProfile, setCurrentUserProfile] = useState<null>(null);
  const apiService = new APIUtil();
  const [loading, setLoading] = useState<boolean>(true);
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
            await fetchCurrentUserProfile(user);
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

  const fetchCurrentUserProfile = async (user: firebase.User) => {
    try {
      setLoading(true);
      let profile;
      profile = await firebaseInstance!.profileService.fetchProfile(user.uid);
      if (!profile) {
        profile = await firebaseInstance!.profileService.addOrUpdateProfile({
          uid: user.uid,
          subscribedSubjects: [],
          user: {
            email: user.email,
            displayName: user.displayName,
            uid: user.uid,
          } as firebase.User,
        });
      }
      setCurrentUserProfile(profile);
    } catch (error) {
      message.error("An error occurred while fetching profile");
      // call bugsnag
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (currentUser) await fetchCurrentUserProfile(currentUser);
  };

  const updateChat = async (subjectId: string) => {
    setLoading(true);
    await apiService.profileService.updateActiveChat(subjectId);
    await refreshProfile();
    setLoading(false);
  };

  return (
    <FireBaseAuthContext.Provider
      value={{
        loading,
        refreshProfile,
        updateChat,
        currentUser,
        authenticated,
        currentUserProfile,
      }}
    >
      {children}
    </FireBaseAuthContext.Provider>
  );
};

export const useAuth = () => useContext(FireBaseAuthContext);
