"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/auth";

interface AppConfigContext {
  logo: string
  appName: string
}

export const AppConfigContext = createContext<AppConfigContext>({
  logo: '',
  appName: ''
});

export const AppConfigProvider: React.FC<any> = ({ children }) => {
  const [logo, setLogo] = useState<string>('');
  const [appName, setAppName] = useState<string>('');


  useEffect(() => {
    // move this to context
    setLogo(`/${window.location.hostname}.png`);
    setAppName(window.location.hostname.split('.')[0]);
  }, []);



  return (
    <AppConfigContext.Provider
      value={{
        logo,
        appName,
      }}
    >
      {children}
    </AppConfigContext.Provider>
  );
}
export const useAppConfig = () => useContext(AppConfigContext);
