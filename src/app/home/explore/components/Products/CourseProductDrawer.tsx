import React, { useContext, useEffect, useState } from "react";
import {
  Drawer,
  List,
  Button,
  Checkbox,
  GetProp,
  Dropdown,
  MenuProps,
  message,
  Switch,
  Select,
} from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import Brands from "@/app/components/Brands";
import { Str } from "@/utils/consts";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";
import UtilService from "@/services/UtilService";
import { IDataPlan, IProduct } from "@/app/interfaces/IProduct";
import { AuthContext } from "@/contexts/AuthContext";
import InputField from "@/app/components/InputField";
import ACButton from "@/app/components/Button";

const buyAirtimeOption = "Buy Airtime";
const buyDataOption = "Buy Mobile data";

// Define types for the component props
interface DrawerProps {
  product: IProduct | null;
  open: boolean;
  dataPlanList: IDataPlan[];
  onClose: () => void;
}

const CourseProductDrawer: React.FC<DrawerProps> = ({
  product,
  onClose,
  open,
}) => {
  const { Option } = Select;

  const apiUtil = new APIUtil();
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const [selectedInterval, setSelectedInterval] = useState(buyDataOption);

  const [formData, setFormData] = useState({
    phone: "",
    data_plan: null,
    amount: "",
    is_promo: false,
  });

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (open) {
      setSelectedInterval(buyDataOption);
      onSetFormData("data_plan", null);
      setIsDone(false);
    }
  }, [open]);

  const onMenuClick = async () => {
    try {
      setLoading(true);
      if (selectedInterval === buyDataOption && !formData.data_plan) {
        message.error("Select a data plan to continue");
        return;
      }

      await apiUtil.productService.buyAirtimeProduct({
        product_id: product!.id.toString(),
        ...formData,
        type: formData.data_plan ? "data" : "airtime",
      });

      authContext.refreshProfile();
      setIsDone(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.reason);

        message.error(
          `${
            error?.response?.data?.message ??
            error?.response?.data?.reason ??
            "Unable to complete request"
          }`
        );
      } else {
        message.error("Unable to complete request");
      }
    } finally {
      setLoading(false);
    }
  };

  const calcHeight =
    window.screen.availHeight - (window.screen.availHeight / 100) * 5;

  const computedHeight = calcHeight >= 633.65 ? 633.65 : calcHeight;
  const brands = (product?.assigned_platforms ?? []).map(
    (assigned) => assigned.platform.icon
  );

  const utils = new UtilService();

  const handleSend = (e: any) => {
    e.preventDefault();
    onMenuClick();
  };

  const onSetFormData = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const onUserClose = () => {
    onClose();
  };

  return (
    <>
      <Drawer
        title={
          <div className="flex flex-end justify-end items-center">
            <span className="text-xs text-foreground-secondary">
              Current balance:{" "}
              {new UtilService().formatMoney(
                `${(authContext.currentUser?.finance?.balance ?? 0) * 100}`,
                "en-NG",
                "NGN"
              )}
            </span>
          </div>
        }
        placement="top"
        height={computedHeight}
        onClose={onClose}
        maskClosable={false}
        open={open}
      >
        <div className="h-screen flex flex-col items-center  pt-40 gap-y-10">
          <div className="flex flex-col gap-y-2 items-center justify-center">
            <Icon icon={"icon-park:success"} className="text-6xl" />
            <span className=" text-foreground text-center block px-2">
              Buy {product?.title}
            </span>
          </div>

          <span className="block text-center text-xs">
            Hi there, Contact support to purchase this course
          </span>
        </div>
      </Drawer>
    </>
  );
};

export default CourseProductDrawer;
