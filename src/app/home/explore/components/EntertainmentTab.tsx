import UtilService from "@/services/UtilService";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "antd";
import React, { useContext, useState } from "react";
import ProductItem from "./Products/ProductItem";
import ProductDrawer from "./Products/ProductDrawer";
import { AuthContext } from "@/contexts/AuthContext";
import APIUtil from "@/services/APIUtil";
import { Str } from "@/utils/consts";
import { IProduct } from "@/app/interfaces/IProduct";

const EntertainmentTab = ({
  loading,
  products = [],
}: {
  loading: boolean;
  products: IProduct[];
}) => {
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

  const getBrands = [...Str.brands];
  const onProductSelected = (product: any) => {
    setSelectedProduct(product);
  };
  return (
    <div className="">
      <ProductDrawer
        product={selectedProduct}
        open={selectedProduct != null}
        onClose={() => setSelectedProduct(null)}
        onSubscribe={onSubscribe}
      />
      {products.map((product, index) => (
        <ProductItem
          key={`${product.title} ${index}`}
          brands={getBrands}
          product={product}
          openProduct={() => onProductSelected(product)}
        />
      ))}
    </div>
  );
};

export default EntertainmentTab;
