"use client";

import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import BasicUserPage from "./BasicUserPage";
import AdminPage from "./AdminPage";

const ExplorePage = () => {
  const authContext = useContext(AuthContext);
  const isAdmin = authContext.currentUser?.is_house_admin === 1; // Assuming there's a role property

  return (
    <>
      {isAdmin ? <AdminPage /> : <BasicUserPage />}
    </>
  );
};

export default ExplorePage;
