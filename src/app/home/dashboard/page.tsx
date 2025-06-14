"use client";

import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import MobileAppDownloadPage from "./MobileAppDownloadPage";
import { useRouter } from "next/navigation";

const ExplorePage = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authContext.currentUser && authContext.currentUser.onboarding_step < 6) {
      // Redirect to the download app page if onboarding is not complete
      router.push(`/download-app`);
    }
  }, [authContext.currentUser, router]);

  // If still loading or user needs to be redirected, don't render content yet
  if (authContext.loading || (authContext.currentUser && authContext.currentUser.onboarding_step < 6)) {
    return null; // Or you could return a loading spinner here
  }

  return (
    <>
      <MobileAppDownloadPage />
    </>
  );
};

export default ExplorePage;
