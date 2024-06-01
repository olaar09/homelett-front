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

const SavedTeamMembers = () => {
  const authContext = useContext(AuthContext);
  const [openAddModal, setOpenAddModal] = useState(false);
  const apiUtils = new APIUtil();
  const router = useRouter();

  const onLogout = () => {
    localStorage.clear();
    router.push("/");
    authContext.clearUser();
  };

  return (
    <>
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

      {!authContext.loading && authContext.currentUser && (
        <div className="h-screen   flex flex-col justify-start mt-10 items-center px-3">
          <img src="/money.png" className=" w-40" />
          <div className="text-center w-full flex justify-center flex-col items-center ">
            <span>
              {" "}
              Earn up to <b> ₦350,000 </b> monthly by sharing your netflix,
              Show-max and Prime video, Spotify premium subscriptions with other
              users.
            </span>
            <br /> <br />
            <div className="w-4/12 flex justify-center items-center my-2">
              <Brands size={"small"} brands={[...Str.brands]} />
            </div>
            Get started and start earning instantly !
          </div>

          <div className="w-8/12 mx-auto mt-10">
            <ACButton text={""} type={"button"} loading={false}>
              <div className="flex items-center gap-x-2 ">
                <Icon icon={"tdesign:money"} className="text-white" />
                <span className="text-white text-sm"> Share subscription </span>
              </div>
            </ACButton>
          </div>
        </div>
      )}
    </>
  );
};

export default SavedTeamMembers;
