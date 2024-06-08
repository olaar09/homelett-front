"use client";

import { Icon } from "@iconify/react";
import { useContext, useEffect, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { Button, Card, Popconfirm, Table, Tag, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";
import { useRouter } from "next/navigation";
import SearchedTable from "../_components/SearchTable";
import RejectCredentialModal from "./CredentialRejectModal";
const { Meta } = Card;

const HeaderItem = ({
  withBg,
  title,
  icon,
}: {
  withBg: boolean;
  title: string;
  icon: string;
}) => {
  return (
    <div
      className={` items-center flex gap-x-1 cursor-pointer hover:opacity-55 transition-all duration-150  py-3 ${
        withBg
          ? "bg-primary text-foreground-inverted rounded-lg px-3 "
          : "text-foreground "
      }`}
    >
      <Icon icon={icon} className="text-xl" />
      <span className="text-sm font-bold mt-0"> {title}</span>
    </div>
  );
};

const CredentialRequests = () => {
  const [selectedConnection, setSelectedConnection] = useState<
    IDataSourceItem | undefined
  >(undefined);

  const [openReject, setOpenReject] = useState(false);

  const [selectedCredential, setSelectedCredential] = useState<string | null>(
    null
  );
  const [selectedPlatform, setSelectedPlatform] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useState(false);
  const currentAuth = useContext(AuthContext);
  const apiUtil = new APIUtil();

  const router = useRouter();

  const onLogout = () => {
    localStorage.clear();
    router.push("/");
    currentAuth.clearUser();
  };

  const {
    data: credentialRequests,
    error,
    loading: loadingCredentialRequests,
    refresh: refreshCredentialRequests,
  } = useRequest(() => getCredentialRequests(), {
    ready:
      currentAuth.currentUser != null && currentAuth.currentUser != undefined,
  });

  console.log(credentialRequests);

  const getCredentialRequests = async (): Promise<any> => {
    try {
      const data = await apiUtil.productService.fetchAllCredentialRequests(
        "accepted"
      );
      console.log(data);

      const list = data;
      return list;
    } catch (error) {
      message.error("unable to load data");
    }
  };

  const openModal = (key: string) => {
    const split = key.split("__");
    setSelectedCredential(split[0]);
    setSelectedPlatform({ id: split[2], name: split[1] });
    if (split[3] === "Revoke") {
      setOpenReject(true);
    }
  };

  const onCloseRejectModal = (refresh: boolean = false) => {
    setOpenReject(false);
    if (refresh) {
      refreshCredentialRequests();
    }
  };

  return (
    <main className="h-full bg-background-thin min-h-screen flex flex-col w-full">
      <RejectCredentialModal
        open={openReject}
        selectedPlatform={selectedPlatform}
        selectedCredential={selectedCredential}
        handleCancel={onCloseRejectModal}
        handleOk={onCloseRejectModal}
      />

      {(currentAuth.loading ||
        loadingCredentialRequests ||
        !credentialRequests) && (
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

      {!loadingCredentialRequests && credentialRequests && (
        <div className="h-screen px-7 py-0 flex flex-col gap-y-4">
          <SearchedTable
            title="Manage credentials"
            actions={["Revoke"]}
            onSelect={openModal}
            data={credentialRequests}
          />
        </div>
      )}
    </main>
  );
};

export default CredentialRequests;
