"use client";

import { Icon } from "@iconify/react";
import { useContext, useEffect, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { Button, Card, Popconfirm, Table, Tag, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import ExpiredCredentialsTable from "../_components/ExpiredCredentialsTable";
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
  const [credentialList, setCredentialList] = useState([]);

  useState(false);
  const currentAuth = useContext(AuthContext);
  const apiUtil = new APIUtil();

  const {
    data: credentialRequests,
    error,
    loading: loadingCredentialRequests,
    refresh: refreshCredentialRequests,
  } = useRequest(() => getExpiredCredentials(), {
    ready:
      currentAuth.currentUser != null && currentAuth.currentUser != undefined,
  });

  useEffect(() => {
    setCredentialList(credentialRequests);
  }, [credentialRequests]);

  console.log(credentialRequests);

  const getExpiredCredentials = async (): Promise<any> => {
    try {
      const data = await apiUtil.productService.fetchExpiredCredential();
      console.log(data);

      const list = data;
      return list;
    } catch (error) {
      message.error("unable to load data");
    }
  };

  return (
    <main className="h-full bg-background-thin min-h-screen flex flex-col w-full">
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
          <ExpiredCredentialsTable
            title="Expired credentials"
            actions={["Revoke"]}
            data={credentialList}
          />
        </div>
      )}
    </main>
  );
};

export default CredentialRequests;
