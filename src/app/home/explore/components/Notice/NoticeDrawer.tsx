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

const NoticeDrawers: React.FC<DrawerProps> = ({ onClose, open, message }) => {
  const util = new UtilService();
  const calcHeight =
    window.screen.availHeight - (window.screen.availHeight / 100) * 5;

  const computedHeight = calcHeight >= 633.65 ? 633.65 : calcHeight;

  return (
    <>
      <Drawer
        title={"Important notice"}
        placement="top"
        height={computedHeight}
        onClose={onClose}
        open={open}
      >
        <div className="flex flex-col  py-6 justify-center items-center text-center px-3 gap-y-4">
          <Icon icon={"ic:baseline-warning"} className="text-3xl" />

          {message}

          <ACButton
            onClick={onClose}
            text={"Close notice"}
            type={"button"}
            loading={false}
            children={undefined}
          />
        </div>
      </Drawer>
    </>
  );
};

export default NoticeDrawers;
