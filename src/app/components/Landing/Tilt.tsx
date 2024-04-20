import Image from "next/image";
import React, { useState, useEffect } from "react";

const FlipOnScroll = ({ rotationDegrees }: any) => {
  return (
    <div className="perspective-800 h-96 lg:h-[500px] w-full mx-auto">
      <div
        className={`transform ${rotationDegrees} h-96 lg:h-[500px]  rounded-lg  transition-all duration-300 w-full bg-no-repeat bg-center bg-contain bg-[url('/home.gif')]`}
      ></div>
    </div>
  );
};

export default FlipOnScroll;
