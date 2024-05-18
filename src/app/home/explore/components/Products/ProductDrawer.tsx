import React, { useState } from "react";
import { Drawer, List, Button } from "antd";
import { IChat } from "@/app/interfaces/IChatItem";
import { Icon } from "@iconify/react/dist/iconify.js";

// Define types for the component props
interface DrawerProps {
  product: any;
  open: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

const ProductDrawer: React.FC<DrawerProps> = ({
  product,
  onSubscribe,
  onClose,
  open,
}) => {
  const handleItemClick = (item: any) => {
    onSubscribe();
  };

  return (
    <>
      <Drawer
        title={""}
        placement="bottom"
        height={
          window.screen.availHeight - (window.screen.availHeight / 100) * 10
        }
        onClose={onClose}
        open={open}
      >
        {product && (
          <div>
            <span>{product?.title}</span>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default ProductDrawer;
