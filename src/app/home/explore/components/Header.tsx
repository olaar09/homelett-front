"use client"

import { useAppConfig } from "@/contexts/AppConfigContext";
import { AuthContext } from "@/contexts/AuthContext";
import UtilService from "@/services/UtilService";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "antd";
import Link from "next/link";
import React, { useContext } from "react";

const ExploreHeader = () => {
  const authContext = useContext(AuthContext);
  const appConfig = useAppConfig();

  const paymentLink = authContext.currentUser?.paymentLink;

  const handlePaymentLink = () => {
    window.open(paymentLink, authContext.currentUser?.paymentLink);
  };

  return (
    <div>
      <span>mecfidkm</span>
    </div>
    /*     <div className="flex h-12 items-center justify-between w-full px-2 ">
          <div className="flex items-center justify-start gap-x-6">
            <img className="w-6 h-6" src={`${appConfig.logo}`} alt="Logo" />
          </div>
          <div>
            <div className="flex items-center justify-end gap-x-4 w-full">
              <span className="text-sm font-bold">
                {new UtilService().formatMoney(
                  `${(authContext.currentUser?.finance?.balance ?? 0) * 100}`,
                  "en-NG",
                  "NGN"
                )}
              </span>
              <div>
    
                <Link href="/home/add_fund">
                  <div className="flex items-center gap-x-2" rel="noreferrer">
                    <Icon icon="majesticons:money-plus" />
                    <span className="text-xs  text-primary">Add fund</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div> */
  );
};

export default ExploreHeader;
