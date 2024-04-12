"use client";

import React, { useContext, useEffect, useState } from "react";
import { Avatar, Spin, Tag, Typography, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";

const SavedTeamMembers = () => {
  const authContext = useContext(AuthContext);
  const [selectedMemberInfo, setSelectedMemberInfo] = useState(undefined);
  const apiUtils = new APIUtil();

  const {
    data: teamList,
    error,
    loading: loadingTeam,
    refresh: refreshTeam,
  } = useRequest(() => getTeamMembers(), {
    ready:
      authContext.currentUser != null && authContext.currentUser != undefined,
  });

  console.log("MKDEWMSKM", teamList);

  const getTeamMembers = async (): Promise<any> => {
    try {
      const data = await apiUtils.teamService.getTeam();
      const list = data.data.data;
      return list;
    } catch (error) {
      message.error("unable to load data");
    }
  };

  return (
    <>
      {(!teamList || teamList?.length < 1) && (
        <div className="h-screen   flex flex-col justify-center items-center">
          {" "}
          <div className="">
            {" "}
            <Spin spinning className="text-lg text-center block"></Spin>{" "}
          </div>
        </div>
      )}

      {teamList && teamList.length > 0 && (
        <Spin spinning={loadingTeam}>
          <div className="w-11/12 mx-auto">
            <div className="my-8 flex justify-between items-center">
              <h1 className="px-3 py-3 text-[14px] rounded-full bg-gray-100 font-bold">
                Manage team members
              </h1>
              {/*  <Button onClick={() => setOpenInviteModal(true)}>
                Invite team member
              </Button> */}
            </div>

            <div className="flex  flex-wrap	gap-y-4 text-sm">
              {teamList?.slice(0, 12).map((teamMemberItem: any) => (
                <div
                  onClick={() => setSelectedMemberInfo(teamMemberItem)}
                  key={teamMemberItem.id}
                  className="w-3/12 cursor-pointer flex-wrap  gap-y-4"
                >
                  <div className="mx-2 relative flex  flex-col">
                    <div className="text-xs flex flex-col gap-x-2 p-0 bg-white shadow-sm p-3 rounded gap-y-2">
                      <div className="flex gap-x-2 items-center">
                        <Avatar
                          style={{
                            backgroundColor: "#f56a00",
                            verticalAlign: "middle",
                          }}
                          gap={1}
                        >
                          {teamMemberItem.fullname?.substring(0, 1)}
                        </Avatar>
                        <span className="text-lg">
                          {" "}
                          {teamMemberItem.fullname}
                        </span>
                      </div>

                      <div className="ml-10 flex flex-col gap-y-2">
                        <div>
                          <span className="text-gray-500">
                            {" "}
                            {teamMemberItem.email}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 h-4">
                            {teamMemberItem.user_role_description ??
                              "User role"}
                          </span>
                        </div>
                        <div className="flex gap-x-3">
                          {teamMemberItem.is_owner === 1 && (
                            <Tag
                              className="py-0 px-2"
                              bordered={false}
                              color="magenta"
                            >
                              Admin
                            </Tag>
                          )}
                          {teamMemberItem.is_activated === 0 && (
                            <Tag
                              className="py-0 px-2"
                              bordered={false}
                              color="lime"
                            >
                              Invite sent
                            </Tag>
                          )}
                          {teamMemberItem.is_activated === 1 && (
                            <Tag
                              className="py-0 px-2"
                              bordered={false}
                              color="orange"
                            >
                              Active
                            </Tag>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Spin>
      )}
    </>
  );
};

export default SavedTeamMembers;
