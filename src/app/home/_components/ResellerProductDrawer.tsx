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
  Input,
  Divider,
} from "antd";
import { IChat } from "@/app/interfaces/IChatItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import Brands from "@/app/components/Brands";
import { Str } from "@/utils/consts";
import { getAvatar, shuffleArray } from "@/utils/helpers";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";
import UtilService from "@/services/UtilService";
import { IProduct } from "@/app/interfaces/IProduct";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import DropDownLabelItem from "../explore/components/Products/DropDownLabel";

/* const payOptions: MenuProps["items"] = [
  {
    key: "Weekly",
    label: (
      <div className="flex items-center gap-x-3">
        <Icon icon={"mdi:calendar-weekend"} />
        <div>Weekly</div>
      </div>
    ),
  },
  {
    key: "Monthly",
    label: (
      <div className="flex items-center gap-x-3">
        <Icon icon={"ic:baseline-calendar-month"} />
        <div> Monthly </div>
      </div>
    ),
  },
  {
    key: "Forever",
    label: (
      <div className="flex items-center gap-x-3">
        <Icon icon={"ic:baseline-calendar-month"} />
        <div> Forever </div>
      </div>
    ),
  },
] */ // Define types for the component props
interface DrawerProps {
  product: IProduct | null;
  open: boolean;
  onClose: () => void;
  /*   onSubscribe: ({
    platforms,
    interval,
  }: {
    product_id: number;
    interval: string;
    platforms: string[];
  }) => void; */
}

const ResellerProductDrawer: React.FC<DrawerProps> = ({ product, onClose, open }) => {
  /*   const handleItemClick = (item: any) => {
    onSubscribe({
      product_id: product!.id,
      platforms: selectedPlatforms,
      interval: "",
    });
  }; */

  const [selectedPlatforms, setSelectedPlatform] = useState<string[]>([]);

  const apiUtil = new APIUtil();
  const [loading, setLoading] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState("Monthly");
  const [displayedPrice, setDisplayedPrice] = useState(0);
  const [email, setEmail] = useState('');

  //const platforms = product?.assigned_platforms.map((pl) => pl.platform);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (open) setSelectedPlatform([]);
  }, [open]);

  useEffect(() => {
    setDisplayedPrice(product?.price ?? 0);
  }, [product]);

  useEffect(() => {
    if (product) {
      //   setSelectedPlatform([product!.assigned_platforms[0]!.platform.name]);
    }
  }, [product]);

  useEffect(() => {
    console.log(selectedInterval);

    const displayedPrice =
      selectedInterval.toLowerCase() === "weekly"
        ? Number(product?.price) * 1
        : selectedInterval.toLowerCase() === "monthly"
          ? Number(product?.price) * 4.3
          : Number(product?.price) * 8;

    setDisplayedPrice(displayedPrice);
  }, [selectedInterval]);

  const onMenuClick = async () => {
    try {
      setLoading(true);
      await apiUtil.productService.buyResellerProduct({
        product_id: product!.id.toString(),
        customer_email: email,
        interval: 'weekly'
      });
      onClose();
      authContext.refreshProfile();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.reason);

        message.error(
          `${error?.response?.data?.message ??
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

  const calcHeight = window.screen.availHeight;

  const computedHeight = calcHeight

  const utils = new UtilService();

  const normalPrice = (displayedPrice * 100) * 4.3
  const resellerPrice = normalPrice / 100 * 5;

  return (
    <>
      <Drawer
        title={
          <div className="flex flex-end justify-start items-center">
            <span className="text-xs">Buy product</span>
          </div>
        }
        placement="top"
        height={computedHeight}
        onClose={onClose}
        maskClosable={false}
        open={open}
      >
        {product && (
          <div className="flex flex-col items-start pb-6 mt-3">
            <div className=" pt-4 px-2 flex justify-between items-end w-full">
              <div className="flex items-center gap-x-0">
                <div className="flex items-start gap-x-2 flex-col">
                  {product.type === 'reseller' && <img className='h-5 w-5 rounded-full' src={product.extra_icon} />}
                  <span className="text-lg">{product?.title}</span>
                </div>

                <a
                  target="_blank"
                  href={product.extra_link}
                  rel="noopener noreferrer"
                >
                  {/*   <Button className="py-0 px-0" type="link">
                    Preview on {product.assigned_platforms[0]?.platform.name}
                  </Button> */}
                </a>
              </div>

              <div className="flex items-center gap-x-2">
                <span className=" text-foreground text-md font-bold mb-1 line-through ">
                  {utils.formatMoney(`${normalPrice}`, "en-NG", "NGN")}
                </span>
                <span className=" text-foreground-secondary text-md font-bold mb-1 ">
                  {utils.formatMoney(`${normalPrice - resellerPrice}`, "en-NG", "NGN")}
                </span>
              </div>

            </div>
            <Divider />
            <div className=" w-full px-3 my-6">
              <span className="text-xs">Customer email</span>
              <Input
                name={"email"}
                readOnly={false}
                disabled={false}
                value={email}
                onChange={(val) => setEmail(val.target.value ?? '')}
                placeholder="email@example.com"
                className={`h-10 text-gray-800 font-bold bg-white border-gray-200 border my-3`}
              />
            </div>
            <div className="flex flex-end justify-end items-center w-full px-3">
              <Button
                onClick={() => onMenuClick()}
                loading={loading}
                className="bg-primary flex justify-center items-center gap-x-3 w-full"
                type="primary"
              >
                {!loading && <Icon icon={"ic:outline-payment"} />}
                <span>Make payment</span>
              </Button>

            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default ResellerProductDrawer;
