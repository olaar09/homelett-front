"use client";

import { Drawer } from "antd";

const NicheProfileDrawer = ({
  open,
  onClose,
}: {
  onClose: any;
  open: boolean;
}) => {
  return (
    <Drawer
      width={
        typeof window !== "undefined"
          ? window.screen.width - window.screen.width / 4.5
          : 0
      }
      title="Manage profile"
      onClose={onClose}
      open={open}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default NicheProfileDrawer;
