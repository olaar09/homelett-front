import Brands from "@/app/components/Brands";
import { Str } from "@/utils/consts";
import React from "react";

const EmptyHighlight = () => {
  return (
    <div className="flex flex-col justify-between items-start w-full">
      <div className="flex flex-col items-center justify-between  w-full ">
        <Brands size="default" brands={Str.brands} />
        <span className="text-xs w-full text-center block mt-2">
          No subscription yet. Select a plan below to get started
        </span>
      </div>
    </div>
  );
};

export default EmptyHighlight;
