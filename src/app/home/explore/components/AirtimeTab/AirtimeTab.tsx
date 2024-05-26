import UtilService from "@/services/UtilService";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "antd";
import React, { useContext, useState } from "react";

import { AuthContext } from "@/contexts/AuthContext";
import APIUtil from "@/services/APIUtil";
import { Str } from "@/utils/consts";
import { IDataPlan, IProduct } from "@/app/interfaces/IProduct";
import ProductDrawer from "../Products/ProductDrawer";
import ProductItem from "../Products/ProductItem";
import AirtimeProductItem from "../Products/AirtimeProductItem";
import AirtimeProductDrawer from "../Products/AirtimeProductDrawer";

const AirtimeTab = ({
  loading,
  dataPlanList,
  products = [],
}: {
  loading: boolean;
  products: IProduct[];
  dataPlanList: IDataPlan[];
}) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [selectedPromo, setSelectedPromo] = useState<{
    label: string;
    logo: string;
  } | null>(null);

  const authContext = useContext(AuthContext);
  const apiUtil = new APIUtil();

  const onProductSelected = (
    product: any,
    promo: { label: string; logo: string } | null
  ) => {
    setSelectedProduct(product);
    setSelectedPromo(promo!);
  };

  return (
    <div className="">
      <AirtimeProductDrawer
        product={selectedProduct}
        open={selectedPromo != null && selectedProduct != null}
        promo={selectedPromo!}
        onClose={() => setSelectedProduct(null)}
        dataPlanList={dataPlanList}
      />
      {products.map((product, index) => (
        <AirtimeProductItem
          key={`${product.title} ${index}`}
          product={product}
          openProduct={(promo: any) => onProductSelected(product, promo)}
        />
      ))}
    </div>
  );
};

export default AirtimeTab;
