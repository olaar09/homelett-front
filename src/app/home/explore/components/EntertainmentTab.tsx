import UtilService from "@/services/UtilService";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "antd";
import React, { useContext, useState } from "react";
import ProductItem from "./Products/ProductItem";
import ProductDrawer from "./Products/ProductDrawer";
import { AuthContext } from "@/contexts/AuthContext";
import APIUtil from "@/services/APIUtil";

const EntertainmentTab = ({ handleContactSupport }: any) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const authContext = useContext(AuthContext);
  const apiUtil = new APIUtil();

  const onSubscribe = async () => {
    console.log("call subscribe here");
    console.log("refresh profile here");

    await apiUtil.productService.buyProduct(selectedProduct.id);
    await authContext.refreshProfile();
  };

  return (
    <div className="">
      <ProductDrawer
        product={selectedProduct}
        open={selectedProduct != null}
        onClose={() => setSelectedProduct(null)}
        onSubscribe={onSubscribe}
      />
      {[
        {
          title: "Stream surfer",
          price: 350 * 100,
          tag: "basic",
          total_allowed: "Select up to 2 services",
          total_allowed_count: 2,
        },
        {
          title: "Stream plus",
          price: 600 * 100,
          tag: "pro",
          total_allowed: "Select up to 3 services",
          total_allowed_count: 3,
        },
        {
          title: "Stream premium",
          price: 800 * 100,
          tag: "platinum",
          total_allowed: "Select up to 4 services",
          total_allowed_count: 4,
        },
        {
          title: "Stream ultimate",
          price: 1000 * 100,
          tag: "platinum",
          total_allowed: "Access to  all  services",
          total_allowed_count: 6,
        },
      ].map((product) => (
        <ProductItem
          product={product}
          openProduct={() => setSelectedProduct(product)}
        />
      ))}
    </div>
  );
};

export default EntertainmentTab;
