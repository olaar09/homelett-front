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
import DropDownLabelItem from "./Products/DropDownLabel";

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

const SingleProductDrawer: React.FC<DrawerProps> = ({ product, onClose, open }) => {
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
      await apiUtil.productService.buyProduct({
        product_id: product!.id.toString(),
        interval: 'forever',
        selected_platforms: selectedPlatforms,
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

  const onToggleService = (platform: any) => {
    const index = selectedPlatforms.indexOf(platform);
    if (index === -1) {
      if (selectedPlatforms.length + 1 > product!.total_selection_count) {
        message.warning(product?.total_selection);
      } else {
        setSelectedPlatform([...selectedPlatforms, platform]);
      }
    } else {
      const cloned = [...selectedPlatforms];
      cloned.splice(index, 1);
      setSelectedPlatform(cloned);
    }
  };

  const calcHeight = window.screen.availHeight;

  const computedHeight = calcHeight
  /*  const brands = (product?.assigned_platforms ?? []).map(
     (assigned) => assigned.platform.icon
   );
  */
  const utils = new UtilService();

  /*   const getOptions = () => {
      const price = product?.price ?? 0;
      return [
        {
          key: "Weekly",
          label: (
            <div className="flex items-center gap-x-3">
              <Icon icon={"mdi:calendar-weekend"} />
              <DropDownLabelItem label="Weekly" amount={price} />
            </div>
          ),
        },
        {
          key: "Monthly",
          label: (
            <div className="flex items-center gap-x-3">
              <Icon icon={"ic:baseline-calendar-month"} />
              <DropDownLabelItem label="Monthly" amount={price * 4.3} />
            </div>
          ),
        },
        {
          key: "Forever",
          label: (
            <div className="flex items-center gap-x-3">
              <Icon icon={"ic:baseline-calendar-month"} />
              <DropDownLabelItem label="Forever" amount={price * 6} />
            </div>
          ),
        },
      ];
    }; */

  return (
    <>
      <Drawer
        title={
          <div className="flex flex-end justify-end items-center">
            <Button
              onClick={() => onMenuClick()}
              loading={loading}
              className="bg-primary flex items-center gap-x-3"
              type="primary"
            >
              {!loading && <Icon icon={"ic:outline-payment"} />}
              <span>Make payment</span>
            </Button>

          </div>
        }
        placement="top"
        height={computedHeight}
        onClose={onClose}
        maskClosable={false}
        open={open}
      >
        {product && (
          <div className="flex flex-col items-start pb-6">
            <div className="w-full flex justify-center items-center ">
              <img
                className="object-cover h-24 w-full"
                src={`/logos/${product.extra_icon}`}
              />
            </div>
            <div className=" pt-4 px-2 flex justify-between items-center w-full">
              <div className="flex items-center gap-x-0">
                {getAvatar(product.tag)}
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

              <span className=" text-foreground text-sm font-bold">
                {utils.formatMoney(`${displayedPrice * 100}`, "en-NG", "NGN")}
              </span>
            </div>

            <div className="mt-4 mb-1 px-2 flex justify-between items-center w-full">
              <div className="flex flex-col">
                <span className="text-lg">{product?.title}</span>
                <span className="text-block text-xs text-foreground-secondary">
                  {product?.total_selection}
                </span>
              </div>
            </div>

            {/*      <div className="px-3">
              <span className="text-xs text-gray-500">
                {product?.total_selection}
              </span>
            </div> */}

            <div className="px-2  overflow-y-scroll mt-2">
              <span className="block">Terms of use</span>
              <div className="text-xs gap-y-2 text-gray-500 flex flex-col pt-1">
                <p>
                  {" "}
                  Once you make payment, you will get the{" "}required details to access this course. You must not share the access with others.
                </p>
              </div>

              <div className="flex flex-col items-start mt-4">
                <div className="flex items-center justify-between w-full">
                  <span className="block">About this course</span>

                </div>

                <div className="text-xs gap-y-2 text-gray-500 flex flex-col pt-1">
                  <p dangerouslySetInnerHTML={{ __html: product.extra }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default SingleProductDrawer;
