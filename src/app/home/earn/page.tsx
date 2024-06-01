"use client";

import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Card, Spin, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import AddTeamModal from "./components/AddTeamModal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Str } from "@/utils/consts";
import Brands from "@/app/components/Brands";
import ACButton from "@/app/components/Button";
import StartEarning from "./components/StartEarning";
import AddCredentialDrawer from "./components/AddCredentialDrawer";

const EarnPage = () => {
  const authContext = useContext(AuthContext);
  const [openAddModal, setOpenAddModal] = useState(false);
  const apiUtils = new APIUtil();
  const router = useRouter();

  const {
    data: credentialList,
    error: credentialListError,
    loading: loadingCredentialList,
    refresh: refreshCredentials,
  } = useRequest(() => getSharedCredentials());

  const getSharedCredentials = async (): Promise<any> => {
    try {
      const data = await apiUtils.productService.fetchShareCredentials();
      return data;
    } catch (error) {
      message.error("unable to load data");
    }
  };

  const onLogout = () => {
    localStorage.clear();
    router.push("/");
    authContext.clearUser();
  };

  const onOpenShareSubscription = () => {
    setOpenAddModal(true);
  };

  const onCloseShareSubscription = () => {
    setOpenAddModal(false);
  };

  return (
    <>
      <AddCredentialDrawer
        open={openAddModal}
        onClose={onCloseShareSubscription}
        refreshCredentials={refreshCredentials}
      />

      {authContext.loading && (
        <div className="h-screen   flex flex-col justify-center items-center">
          {" "}
          <div className="">
            {" "}
            <Icon
              icon={"eos-icons:three-dots-loading"}
              className=" text-6xl text-foreground"
            />
          </div>
        </div>
      )}

      {!authContext.loading &&
        authContext.currentUser &&
        (!credentialList || credentialList.length < 1) && (
          <StartEarning onClick={onOpenShareSubscription} />
        )}

      {!authContext.loading &&
        authContext.currentUser &&
        credentialList &&
        credentialList.length > 0 && (
          <StartEarning onClick={onOpenShareSubscription} />
        )}
    </>
  );
};

export default EarnPage;
