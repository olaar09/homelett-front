"use client";

import { Icon } from "@iconify/react";
import { useContext, useEffect, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

import { Button, Card, Popconfirm, Statistic, Table, Tag, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";
import { useRouter } from "next/navigation";
import SearchedTable from "../_components/SearchTable";
import RejectCredentialModal from "./CredentialRejectModal";
import DashboardTable from "../_components/DashboardTable";
const { Meta } = Card;

const CredentialRequests = () => {
  const [selectedConnection, setSelectedConnection] = useState<
    IDataSourceItem | undefined
  >(undefined);

  const [openReject, setOpenReject] = useState(false);
  const [credentialRequestsList, setCredentialRequestsList] = useState([]);
  const [credentialsAggregate, setCredentialsAggregate] = useState([]);
  const [selectedCredential, setSelectedCredential] = useState<string | null>(
    null
  );
  const [selectedPlatform, setSelectedPlatform] = useState<{
    id: string;
    name: string;
    email: string;
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

  useEffect(() => {
    if (credentialRequests && credentialRequests.list) {
      setCredentialRequestsList(credentialRequests.list);
      setCredentialsAggregate(credentialRequests.aggregate);
    }
  }, [credentialRequests]);

  console.log(credentialRequests);

  const getCredentialRequests = async (): Promise<any> => {
    try {
      const data =
        await apiUtil.productService.fetchAllAvailableCredentialList();
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
    setSelectedPlatform({ id: split[2], name: split[1], email: split[4] });
    if (split[3] === "Revoke") {
      setOpenReject(true);
    }
  };

  const onCloseRejectModal = (selectedCredential?: string | null) => {
    setOpenReject(false);
    hideCredential(selectedCredential);
  };

  const hideCredential = (selectedCredential?: string | null) => {
    if (selectedCredential) {
      const index = credentialRequestsList.findIndex(
        (cr: any) => cr.id == selectedCredential
      );
      console.log("oijwndijwqd coiwcoiedsnx ejiondskm", index);
      const adjusted = [...credentialRequestsList];
      adjusted.splice(index, 1);
      setCredentialRequestsList([...adjusted]);
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
        <div className="h-screen  px-7 py-0 flex flex-col gap-y-4 overflow-auto">
          <div className="">
            <div className="h-16 px-4 flex items-center ju"></div>

            <div className="flex items-center w-full  flex-wrap gap-y-6">
              {credentialsAggregate.map((platform: any) => (
                <div className="px-4 w-1/5">
                  <Card className=" w-full shrink-0 " bordered={false}>
                    <Statistic
                      title={platform.name}
                      value={platform.total_slots_left}
                      precision={2}
                      valueStyle={{ color: "#cf1322" }}
                    />
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 py-0 flex flex-col gap-y-4">
            <DashboardTable
              title="Available logins"
              actions={["Revoke"]}
              onSelect={openModal}
              data={credentialRequestsList}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default CredentialRequests;
