import React, { useState, useEffect } from "react";

const FlipOnScroll = ({ rotationDegrees }: any) => {
  return (
    <div className="perspective-800 h-52 lg:h-[500px] w-10/12 mx-auto">
      <div
        className={`transform ${rotationDegrees} h-52 lg:h-[500px]  rounded-lg  transition-all duration-300 w-full bg-no-repeat bg-center bg-contain bg-[url('/home_hero.png')]`}
      ></div>
    </div>
  );
};

export default FlipOnScroll;
