"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import "firebase/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { message } from "antd";
import APIUtil from "@/services/APIUtil";
import { IAuthRequest, IJProfile } from "@/app/interfaces/IRegisterRequest";
import { AxiosError } from "axios";
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";

interface IAuthContext {
  dataSources?: IDataSourceItem[] | null;
  refreshDataSource: () => Promise<void>;
  clearUser: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateKey: (key: string) => Promise<any>;
  currentUser: IAuthRequest | null;
  authenticated: boolean;
  loading: boolean;
  loadingSources: boolean;
  loadingOpenAIKey: boolean;
  activeProfile?: IJProfile | null;
}

export const AuthContext = createContext<IAuthContext>({
  dataSources: null,
  currentUser: null,
  authenticated: false,
  loadingOpenAIKey: false,
  loading: true,
  loadingSources: true,
  activeProfile: null,
  updateKey: async (key: string) => { },
  clearUser: async () => { },
  refreshProfile: async () => { },
  refreshDataSource: async () => { },
});

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IAuthRequest | null>(null);
  const [activeProfile, setActiveProfile] = useState<IJProfile | null>(null);

  const [dataSources, setDataSources] = useState<IDataSourceItem[] | null>(
    null
  );
  const apiService = new APIUtil();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSources, setLoadingSources] = useState<boolean>(true);
  const [loadingOpenAIKey, setLoadingOpenAIKey] = useState<boolean>(false);
  const authenticated = !!currentUser;
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (currentUser) {
      fetchDataSource();
    } else if (!currentUser && !loading) {
      setCurrentUser(null);
      setDataSources(null);
    }
  }, [currentUser]);

  const goHome = (currentUser: IAuthRequest) => {
    console.log(".....currentUser.....", currentUser);
    // alert(currentUser)
    if (currentUser.onboarding_step >= 6) {
      router.push(`/home/dashboard`);
    } else {
      router.push(`/request-invite/${currentUser.invite_code}`);
    }
  };

  useEffect(() => {
    if (currentUser) {
      if (path === "/login") {
        goHome(currentUser);
        return;
      }
    } else {
      fetchCurrentUserProfile();
    }
  }, [router, currentUser]);

  const clearUser = async () => {
    setCurrentUser(null);
  };

  const updateKey = async (key: string): Promise<any> => {
    try {
      setLoadingOpenAIKey(true);
      //  await apiService.integrationsService.updateOpenAIKey(key);
      await refreshProfile();
      message.success("Updated OpenAI key");

      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        message.error(
          `${error?.response?.data?.message ??
          error?.response?.data?.reason ??
          "Unable to update key"
          }`
        );
      }
      return false;
    } finally {
      setLoadingOpenAIKey(false);
    }
  };

  const fetchDataSource = async () => { };

  const fetchCurrentUserProfile = async () => {
    setLoading(true);
    try {
      const user = await apiService.profileService.loadProfile();
      if (user) {
        console.log(".....user.....", user);

        setCurrentUser(user.data);
        if (path === "/login") {
          goHome(user.data);
          return;
        }
      } else {
        if (
          path !== "/" &&
          !path.includes("login") &&
          !path.includes("request-invite")
        ) {
          router.push(`/`);
          return;
        }
      }
    } catch (error) {
      if (
        path !== "/" &&
        !path.includes("login") &&
        !path.includes("request-invite") &&
        !path.includes("request-utility-invite")
      ) {
        router.push(`/`);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshDataSource = async () => {
    await fetchDataSource();
  };

  const refreshProfile = async () => {
    await fetchCurrentUserProfile();
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        loadingSources,
        loadingOpenAIKey,
        dataSources,
        updateKey,
        refreshProfile,
        clearUser,
        refreshDataSource,
        currentUser,
        authenticated,
        activeProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
