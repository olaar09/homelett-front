import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  Button,
  Checkbox,
  GetProp,
  Dropdown,
  MenuProps,
  message,
} from "antd";
import { IChat } from "@/app/interfaces/IChatItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import Brands from "@/app/components/Brands";
import { Str } from "@/utils/consts";
import { shuffleArray } from "@/utils/helpers";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";
import UtilService from "@/services/UtilService";
import { IProduct } from "@/app/interfaces/IProduct";

const payOptions: MenuProps["items"] = [
  {
    key: "weekly",
    label: (
      <div className="flex items-center gap-x-3">
        <Icon icon={"mdi:calendar-weekend"} />
        <div>Weekly</div>
      </div>
    ),
  },
  {
    key: "monthly",
    label: (
      <div className="flex items-center gap-x-3">
        <Icon icon={"ic:baseline-calendar-month"} />
        <div> Monthly </div>
      </div>
    ),
  },
];

// Define types for the component props
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

const ProductDrawer: React.FC<DrawerProps> = ({ product, onClose, open }) => {
  /*   const handleItemClick = (item: any) => {
    onSubscribe({
      product_id: product!.id,
      platforms: selectedPlatforms,
      interval: "",
    });
  }; */

  const [selectedPlatforms, setSelectedPlatform] = useState<string[]>([]);

  const apiUtil = new APIUtil();
  const isUltimate = product?.total_selection_count === Str.brands.length;
  const [loading, setLoading] = useState(false);

  const platforms = product?.assigned_platforms.map((pl) => pl.platform);

  useEffect(() => {
    if (open) setSelectedPlatform([]);
  }, [open]);

  const onMenuClick: MenuProps["onClick"] = async ({ key }) => {
    try {
      setLoading(true);
      await apiUtil.productService.buyProduct({
        product_id: product!.id.toString(),
        interval: key,
        selectedPlatforms: selectedPlatforms,
      });
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

  const calcHeight =
    window.screen.availHeight - (window.screen.availHeight / 100) * 5;

  const computedHeight = calcHeight >= 633.65 ? 633.65 : calcHeight;
  const brands = (product?.assigned_platforms ?? []).map(
    (assigned) => assigned.platform.icon
  );

  return (
    <>
      <Drawer
        title={
          <div className="flex flex-end justify-end items-center">
            <Dropdown
              disabled={
                selectedPlatforms.length < (product?.total_selection_count ?? 0)
              }
              menu={{ items: payOptions, onClick: onMenuClick }}
              placement="bottom"
            >
              <Button
                loading={loading}
                className="bg-primary flex items-center gap-x-3"
                type="primary"
              >
                {!loading && <Icon icon={"ic:outline-payment"} />}
                <span>Make payment</span>
              </Button>
            </Dropdown>
          </div>
        }
        placement="bottom"
        height={computedHeight}
        onClose={onClose}
        maskClosable={false}
        open={open}
      >
        {product && (
          <div className="flex flex-col items-start py-6">
            <div className=" px-6">
              <Brands size="small" brands={brands} />
            </div>

            <div className="mt-4 mb-1 px-3 flex justify-between items-center w-full">
              <span className="text-lg">{product?.title}</span>
              <span className=" text-foreground-secondary">
                {new UtilService().formatMoney(
                  `${product?.price * 100}`,
                  "en-NG",
                  "NGN"
                )}{" "}
                / weekly
              </span>
            </div>

            {/*      <div className="px-3">
              <span className="text-xs text-gray-500">
                {product?.total_selection}
              </span>
            </div> */}

            <div className="px-3  max-h-80 overflow-y-scroll mt-2">
              <span className="block">Terms of use</span>
              <div className="text-xs gap-y-2 text-gray-500 flex flex-col pt-1">
                {!isUltimate && (
                  <p>
                    {" "}
                    You may select only {product?.total_selection_count} of the
                    services presented in the options.
                  </p>
                )}
                <p>
                  You must not share the credentials with anyone, if sharing is
                  detected, you will be banned immediately forever. Sharing
                  credentials directly prevents other users from enjoying the
                  services they have paid for.
                </p>
              </div>

              <div className="flex flex-col items-start mt-4">
                <span className="text-block text-xs">
                  {product?.total_selection}
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-col px-3 w-full gap-y-2">
              {platforms!.map((pl) => (
                <div
                  onClick={() => onToggleService(pl.name)}
                  className="w-full flex justify-between items-center gap-x-3 h-10 cursor-pointer hover:bg-slate-100 transition-all duration-100 rounded-md"
                >
                  <div className="flex items-center gap-x-3">
                    <img src={pl.icon} className="w-6 h-6" />
                    <span className="text-sm">{pl.name}</span>
                  </div>

                  <div>
                    <Icon
                      icon={
                        selectedPlatforms.includes(pl.name)
                          ? "icon-park-solid:check-one"
                          : "gg:radio-check"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default ProductDrawer;
