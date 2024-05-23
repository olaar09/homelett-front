"use client";

import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Card, Spin, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import AddTeamModal from "./components/AddTeamModal";
import { useRouter } from "next/navigation";

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
        <Spin
          indicator={
            <Icon
              icon={"eos-icons:three-dots-loading"}
              className=" text-8xl text-foreground"
            />
          }
          spinning={authContext.loading}
          className="bg-background-thin"
        >
          <div className="bg-background-thin min-h-screen">
            <section className="h-20  flex items-center justify-between px-8 mt-0 mx-auto w-full bg-background-thin">
              {/*  <div className="flex items-center gap-x-7">
                <div onClick={() => handleAddTeam()}>
                  <HeaderItem
                    icon="gg:add"
                    title="Add team member"
                    withBg={true}
                  />
                </div>
              </div> */}
            </section>

            <div className="w-full mx-auto mt-10 bg-background-thin">
              <section className=" flex items-center w-full  px-8 mt-10 flex-wrap gap-y-4 overflow-y-scroll pb-20">
                <div className="lg:w-8/12 w-full items-center mx-auto ">
                  <Card className="w-full">
                    <div className="flex flex-col gap-x-2 gap-y-3 items-center justify-center">
                      <Avatar
                        style={{
                          backgroundColor: "#f56a00",
                          verticalAlign: "middle",
                        }}
                        gap={1}
                      >
                        {authContext.currentUser.fullname?.substring(0, 1)}
                      </Avatar>
                      <span className="text-lg">
                        {" "}
                        {authContext.currentUser.fullname}
                      </span>

                      <span className="text-gray-400">
                        {authContext.currentUser.email}
                      </span>

                      <span className="text-gray-400">
                        {authContext.currentUser.phone}
                      </span>
                    </div>

                    <div className="flex items-center flex-col justify-start py-2 h-12 border border-gray-200 mt-10 w-6/12 mx-auto">
                      <span className="text-lg"> {"Active"}</span>
                    </div>

                    <div className="flex items-center mt-10 w-full mx-auto  justify-center">
                      <Button onClick={onLogout}>Logout</Button>
                    </div>
                  </Card>
                </div>
              </section>
            </div>
          </div>
        </Spin>
      )}
    </>
  );
};

export default SavedTeamMembers;
