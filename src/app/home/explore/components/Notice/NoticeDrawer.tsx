import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { Drawer, MenuProps } from "antd";
import { IChat } from "@/app/interfaces/IChatItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import ACButton from "@/app/components/Button";

// Define types for the component props
interface DrawerProps {
  balanceRequired: number;
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

const NoticeDrawers: React.FC<DrawerProps> = ({ onClose, open }) => {
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

          <span className="text-center">
            Dear user, earlier today, we discovered users get double the amount
            when they make a new deposit.
            <br /> <br />
            unfortunately, most users decided to keep this money and buy airtime
            and streaming plans with it causing us great losses.
            <br /> <br />
            To capture back our losses, we have began to block all users that
            benefitted from this and revoke the login credentials for all
            streaming product.
            <br /> <br />
            If your are seeing this message, Your account has been flagged as
            one of those users. you need to add money back to refund us for the
            excess, then your plans will be restored.
            <br /> <br />
            If you believe your account is flagged in error, we are sorry.
            kindly send us your email and proof that all the money spent so far
            were deposited legitimately
          </span>

          <ACButton
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
