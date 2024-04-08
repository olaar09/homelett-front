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
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";

interface IAuthContext {
  dataSources?: IDataSourceItem[] | null;
  refreshDataSource: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  currentUser: IAuthRequest | null;
  authenticated: boolean;
  loading: boolean;
  loadingSources: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  dataSources: null,
  currentUser: null,
  authenticated: false,
  loading: true,
  loadingSources: true,
  refreshProfile: async () => {},
  refreshDataSource: async () => {},
});

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IAuthRequest | null>(null);
  const [dataSources, setDataSources] = useState<IDataSourceItem[] | null>(
    null
  );
  const apiService = new APIUtil();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSources, setLoadingSources] = useState<boolean>(true);
  const authenticated = !!currentUser;
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    if (currentUser) fetchDataSource();
  }, [currentUser]);

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

  const fetchDataSource = async () => {
    try {
      setLoadingSources(true);
      const dataSources = await apiService.datasourceService.listSources();
      console.log(dataSources.data.data);

      setDataSources(dataSources.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        message.error(
          `${error?.response?.data?.message ?? "Unable to complete request"}`
        );
      }
    } finally {
      setLoadingSources(false);
    }
  };

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

  const refreshDataSource = async () => {
    if (currentUser) await fetchDataSource();
  };

  const refreshProfile = async () => {
    if (currentUser) await fetchCurrentUserProfile();
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        loadingSources,
        dataSources,
        refreshProfile,
        refreshDataSource,
        currentUser,
        authenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
