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
import { IAuthRequest } from "@/app/interfaces/IRegisterRequest";
import { AxiosError } from "axios";

interface IAuthContext {
  refreshProfile: () => Promise<void>;
  currentUser: IAuthRequest | null;
  authenticated: boolean;
  loading: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  authenticated: false,
  loading: true,
  refreshProfile: async () => {},
});

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IAuthRequest | null>(null);
  const apiService = new APIUtil();
  const [loading, setLoading] = useState<boolean>(true);
  const authenticated = !!currentUser;
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    const queryParams = new URLSearchParams(params).toString();

    if (currentUser) {
      if (path === "/") {
        router.push(`/home/chat${queryParams ? `?${queryParams}` : ""}`);
        return;
      }
    } else {
      fetchCurrentUserProfile();
    }
  }, [router]);

  const fetchCurrentUserProfile = async () => {
    const queryParams = new URLSearchParams(params).toString();
    setLoading(true);
    try {
      const user = await apiService.profileService.loadProfile();
      if (user) {
        setCurrentUser(user);
        if (path === "/") {
          router.push(`/home/chat${queryParams ? `?${queryParams}` : ""}`);
          return;
        }
      } else {
        if (path !== "/") {
          router.push(`/`);
          return;
        }
      }
    } catch (error) {
      /* if (error instanceof AxiosError) {
        console.log(error);

        message.error(
          `${error?.response?.data?.message ?? "Unable to complete request"}`
        );
      } else {
        message.error("Unable to fetch user");
      } */
      if (path !== "/") {
        router.push(`/`);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (currentUser) await fetchCurrentUserProfile();
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        refreshProfile,
        currentUser,
        authenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
