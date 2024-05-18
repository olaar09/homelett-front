import UtilService from "@/services/UtilService";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "antd";
import React from "react";
import ProductItem from "./Products/ProductItem";
import ProductDrawer from "./Products/ProductDrawer";

const EarnTab = ({ handleContactSupport }: any) => {
  return (
    <div className="">
      <ProductDrawer
        product={undefined}
        open={false}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onSubscribe={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <div className="flex flex-col items-center justify-center h-72 gap-y-10">
        <img className="h-12" src="/fun-arrow.svg" />
        <span>Coming soon !</span>
      </div>
    </div>
  );
};

export default EarnTab;
