"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Popconfirm,
  Spin,
  Tag,
  Typography,
  message,
} from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import { HeaderItem } from "../_components/PageHeaderItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import Meta from "antd/es/card/Meta";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddTeamModal from "./components/AddTeamModal";

const SavedTeamMembers = () => {
  const authContext = useContext(AuthContext);
  const [openAddModal, setOpenAddModal] = useState(false);
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

  const handleAddTeam = () => {
    setOpenAddModal(true);
  };

  const handleCloseTeam = (status = false) => {
    setOpenAddModal(false);
    if (status) {
      refreshTeam();
    }
  };

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
      <AddTeamModal open={openAddModal} onCancel={handleCloseTeam} />
      {(loadingTeam || !teamList || teamList?.length < 1) && (
        <div className="h-screen   flex flex-col justify-center items-center">
          {" "}
          <div className="">
            {" "}
            <Icon
              icon={"eos-icons:three-dots-loading"}
              className=" text-6xl text-foreground"
            ></Icon>
          </div>
        </div>
      )}

      {teamList && teamList.length > 0 && (
        <Spin spinning={loadingTeam} className="bg-background-thin">
          <div className="bg-background-thin min-h-screen">
            <section className="h-20  flex items-center justify-between px-8 mt-0 mx-auto w-full bg-background-thin">
              <div className="flex flex-col">
                <HeaderItem
                  icon={"ant-design:team-outlined"}
                  title={`Team members`}
                  withBg={false}
                />
                <span className="text-xs text-foreground-secondary truncate w-52">
                  Manage & add team members
                </span>
              </div>

              <div className="flex items-center gap-x-7">
                <div onClick={() => handleAddTeam()}>
                  <HeaderItem
                    icon="gg:add"
                    title="Add team member"
                    withBg={true}
                  />
                </div>
              </div>
            </section>

            <div className="w-full mx-auto mt-10 bg-background-thin">
              <section className=" flex items-center w-full  px-8 mt-10 flex-wrap gap-y-4 overflow-y-scroll pb-20">
                {(teamList ?? []).map((teamMemberItem: any) => (
                  <div className="w-4/12 ">
                    <div className="mr-4 relative cursor-pointer hoverContainer transition-all">
                      <Card
                        className="rounded-2xl h-40 relative cursor-pointer"
                        bordered={false}
                      >
                        <Meta
                          title={
                            <div className="flex items-center gap-x-2">
                              <Icon icon={"mdi:user"} />
                              <span> {teamMemberItem.fullname}</span>
                            </div>
                          }
                          description={
                            teamMemberItem.is_owner === 1
                              ? "Administrator"
                              : "Team member"
                          }
                        />
                      </Card>
                      <div className=" absolute top-3 right-4 z-10 hoverItem transition-all duration-150">
                        <div className=" flex items-center -gap-x-2 transition-all duration-300">
                          <Popconfirm
                            title="Delete the connection"
                            description="Are you sure to delete this connection?"
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button
                              className="text-red-500"
                              icon={<DeleteOutlined />}
                              type="link"
                            />
                          </Popconfirm>
                          <Button
                            icon={<EditOutlined />}
                            className="text-success-500"
                            type="link"
                          />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-2 z-10">
                        <Tag
                          bordered={false}
                          color={
                            teamMemberItem.is_activated === 1
                              ? "geekblue"
                              : "volcano"
                          }
                        >
                          {teamMemberItem.is_activated === 1
                            ? "Active"
                            : "Not active"}
                        </Tag>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </Spin>
      )}
    </>
  );
};

export default SavedTeamMembers;
