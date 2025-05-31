"use client";

import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import BasicUserPage from "./BasicUserPage";
import AdminPage from "./AdminPage";
import { useRouter } from "next/navigation";

const ExplorePage = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const isAdmin = authContext.currentUser?.is_house_admin === 1; // Assuming there's a role property

  useEffect(() => {
    if (authContext.currentUser && authContext.currentUser.onboarding_step < 6) {
      // Redirect to the invite page if onboarding is not complete
      router.push(`/request-invite/${authContext.currentUser.invite_code}`);
    }
  }, [authContext.currentUser, router]);

  // If still loading or user needs to be redirected, don't render content yet
  if (authContext.loading || (authContext.currentUser && authContext.currentUser.onboarding_step < 6)) {
    return null; // Or you could return a loading spinner here
  }

  return (
    <>
      {isAdmin ? <AdminPage /> : <BasicUserPage />}
    </>
  );
};

export default ExplorePage;
