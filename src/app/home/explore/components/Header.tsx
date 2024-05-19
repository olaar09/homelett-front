import { AuthContext } from "@/contexts/AuthContext";
import UtilService from "@/services/UtilService";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "antd";
import React, { useContext } from "react";

const ExploreHeader = () => {
  const authContext = useContext(AuthContext);

  const paymentLink = authContext.currentUser?.paymentLink;

  const handlePaymentLink = () => {
    window.open(paymentLink, authContext.currentUser?.paymentLink);
  };

  return (
    <div className="flex h-12 items-center justify-between w-full px-2 lg:hidden">
      <div className="flex items-center justify-start gap-x-6">
        <img className="w-6 h-6" src="/logo.png" alt="Logo" />
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
            <Button
              onClick={handlePaymentLink}
              type="link"
              loading={false}
              className="px-0"
            >
              <div className="flex items-center gap-x-2">
                <Icon icon="majesticons:money-plus" />
                <span className="text-xs  text-primary">Add fund</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Uncomment and use if needed */}
        {/* <Button
          onClick={handleContactSupport}
          className="px-0"
          size="large"
          type="link"
        >
          <Icon className="text-2xl" icon="logos:whatsapp-icon" />
        </Button> */}
      </div>
    </div>
  );
};

export default ExploreHeader;
