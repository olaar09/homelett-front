import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { Drawer, MenuProps } from "antd";
import { IChat } from "@/app/interfaces/IChatItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import ACButton from "@/app/components/Button";
import UtilService from "@/services/UtilService";

import Brands from "@/app/components/Brands";
import Chip from "@/app/components/Chip";
import { IProduct } from "@/app/interfaces/IProduct";

import { Tag } from "antd";
import { Str } from "@/utils/consts";

// Define types for the component props
interface DrawerProps {
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

const InfoDrawer: React.FC<DrawerProps> = ({
  onClose = () => {},
  open,
  onClick,
  title = "How referral works",
  action = "Close notice",
  icon = "ic:baseline-warning",
}) => {
  const util = new UtilService();
  const calcHeight = window.screen.availHeight;

  // const computedHeight = calcHeight >= 633.65 ? 633.65 : calcHeight;

  return (
    <>
      <Drawer
        title={<span className=" text-foreground-secondary">{title}</span>}
        placement="top"
        height={calcHeight}
        onClose={onClose}
        open={open}
      >
        <div className="flex flex-col  py-4 justify-center items-start text-center px-3 gap-y-4">
          <Tag className=" text-wrap block text-center">
            You must have bought any plan at least once to unlock referral
            benefits
          </Tag>
          <span className="text-sm text-foreground-secondary">
            Simply share your link with friends and family and instantly earn
            cash when they buy any plan on bubble. <br />{" "}
          </span>
          <span className=" text-foreground block text-center w-full">
            The referral cash-out are as follows:{" "}
          </span>
          <div className="flex flex-col gapy-3 w-full">
            {[
              {
                label: "Stream classic & prime",
                amount: 200,
                brands: Str.brands,
              },
              { label: "Stream plus", amount: 350, brands: Str.brands },
              {
                label: "Stream premium & ultimate",
                amount: 500,
                brands: Str.brands,
              },
              {
                label: "Online courses",
                amount: 300,
                brands: Str.courseBrands,
              },
              { label: "Elite pack", amount: 1000, brands: Str.utilityBrands },
              { label: "Utilites pro", amount: 600, brands: Str.utilityBrands },
              {
                label: "Essential tools",
                amount: 300,
                brands: Str.utilityBrands,
              },
            ].map((plan) => {
              return (
                <PlatItem
                  bonusAmount={plan.amount}
                  title={plan.label}
                  brands={plan.brands}
                />
              );
            })}
          </div>
          <div className="flex w-8/12 mx-auto ">
            <ACButton
              text=""
              onClick={onClick ?? onClose}
              type={"button"}
              loading={false}
            >
              <div className="flex items-center text-sm gap-x-2">
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

export default InfoDrawer;

const PlatItem = ({
  title,
  bonusAmount,
  brands,
}: {
  bonusAmount: number;
  brands: string[];
  title: string;
}) => {
  const bonus = new UtilService().formatMoney(
    `${bonusAmount * 100}`,
    "en-NG",
    "NGN"
  );

  return (
    <div className="px-2  w-full h-28   my-2 border-b border-b-gray-100">
      <div className=" h-full   flex flex-col px-1 rounded-md bg-opacity-80  relative">
        <div className="px-3 py-2 justify-between flex items-center ">
          <div className="flex items-center">
            <Brands size="small" brands={brands} />
          </div>
        </div>
        <div className="flex flex-col mt-1 gap-y-2">
          <div className="w-full flex justify-between items-center">
            <span className="text-xs ">{title}</span>
          </div>

          <div className="w-full flex justify-between items-center">
            <span className="text-xs text-foreground-secondary ">
              Get {bonus} each time invited user buys this plan
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
