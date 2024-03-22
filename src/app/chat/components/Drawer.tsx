// components/SlideOut.tsx
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

type DrawerProps = {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
};

const Drawer: React.FC<DrawerProps> = ({ isOpen, setIsOpen }) => {
  return (
    <aside className=" lg:hidden">
      <button
        className="fixed top-4 left-4 z-30 p-2 text-white bg-background rounded hover:bg-background"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon
          icon={isOpen ? "fluent-mdl2:cancel" : "material-symbols:menu"}
          className="text-3xl cursor-pointer"
        />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 z-20 w-64 h-full bg-background shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 mt-12">
          <h2 className="text-lg font-bold">Slide-Out Content</h2>
          <p>This is the content of the slide-out panel.</p>
        </div>
      </div>
    </aside>
  );
};

export default Drawer;
