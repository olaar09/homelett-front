import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { Drawer, MenuProps } from "antd";
import { IChat } from "@/app/interfaces/IChatItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import ACButton from "@/app/components/Button";
import UtilService from "@/services/UtilService";

// Define types for the component props
interface DrawerProps {
  message: React.ReactNode | string;
  open: boolean;
  icon?: string;
  title?: string;
  action?: string;
  onClick?: () => void;
  onClose: () => void;
  /*   onSubscribe: ({
    platforms,
    interval,
  }: {
    product_id: number;
    interval: string;
    platforms: string[];
  }) => void; */
}

const NoticeDrawers: React.FC<DrawerProps> = ({
  onClose = () => {},
  open,
  onClick,
  message,
  title = "Important notice",
  action = "Close notice",
  icon = "ic:baseline-warning",
}) => {
  const util = new UtilService();
  const calcHeight =
    window.screen.availHeight - (window.screen.availHeight / 100) * 5;

  const computedHeight = calcHeight >= 633.65 ? 633.65 : calcHeight;

  return (
    <>
      <Drawer
        title={title}
        placement="top"
        height={computedHeight}
        onClose={onClose}
        open={open}
      >
        <div className="flex flex-col  py-6 justify-center items-center text-center px-3 gap-y-4">
          <Icon icon={icon} className="text-6xl" />

          {message}

          <div className="flex w-8/12 mx-auto ">
            <ACButton
              text=""
              onClick={onClick ?? onClose}
              type={"button"}
              loading={false}
            >
              <div className="flex items-center text-xs gap-x-2">
                <Icon className="text-white" icon={icon} />
                <span className="text-white">{action ?? "Close notice"}</span>
              </div>
            </ACButton>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default NoticeDrawers;
