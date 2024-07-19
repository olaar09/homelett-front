import UtilService from "@/services/UtilService";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "antd";
import React, { useContext, useState } from "react";

import { AuthContext } from "@/contexts/AuthContext";
import APIUtil from "@/services/APIUtil";
import { Str } from "@/utils/consts";
import { IDataPlan, IProduct } from "@/app/interfaces/IProduct";
import CourseProductItem from "../Products/CourseProductItem";
import CourseProductDrawer from "../Products/CourseProductDrawer";

const CourseTab = ({
  loading,
  products = [],
}: {
  loading: boolean;
  products: IProduct[];
}) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [selectedPromo, setSelectedPromo] = useState<{
    label: string;
    logo: string;
  } | null>(null);

  const authContext = useContext(AuthContext);
  const apiUtil = new APIUtil();

  const onProductSelected = (product: any) => {
    setSelectedProduct(product);
  };

  return (
    <div className="">
      <CourseProductDrawer
        product={selectedProduct}
        open={selectedProduct != null}
        onClose={() => setSelectedProduct(null)}
      />
      {products.map((product, index) => (
        <CourseProductItem
          key={`${product.title} ${index}`}
          product={product}
          openProduct={() => onProductSelected(product)}
        />
      ))}
    </div>
  );
};

export default CourseTab;
