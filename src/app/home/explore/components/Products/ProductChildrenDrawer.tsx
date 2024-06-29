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
  Tag,
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
import { AuthContext } from "@/contexts/AuthContext";
import WeeklyWarning from "./WeeklyWarning";
import OrderComplete from "./OrderComplete";
import DropDownLabelItem from "./DropDownLabel";

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

const ProductChildrenDrawer: React.FC<DrawerProps> = ({
  product,
  onClose,
  open,
}) => {
  /*   const handleItemClick = (item: any) => {
    onSubscribe({
      product_id: product!.id,
      platforms: selectedProduct,
      interval: "",
    });
  }; */

  const [selectedProduct, setSelectedProduct] = useState<IProduct>();

  const apiUtil = new APIUtil();
  const isUltimate = product?.total_selection_count === Str.brands.length;
  const [loading, setLoading] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState("");
  const [displayedPrice, setDisplayedPrice] = useState(0);
  const [isNotAvailable, setIsNotAvailable] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const platforms = product?.assigned_platforms.map((pl) => pl.platform);
  const productChildren = product?.children ?? [];
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (open) {
      setSelectedProduct(undefined);
      setIsNotAvailable(false);
      setIsComplete(false);
      setSelectedInterval("Weekly");
    }
  }, [open]);

  useEffect(() => {
    if (selectedInterval && selectedProduct) {
      const price =
        selectedInterval.toLowerCase() === "weekly"
          ? Number(selectedProduct?.price) * 1
          : Number(selectedProduct?.price) * 4.3;

      setDisplayedPrice(price);
    }
  }, [selectedProduct, selectedInterval]);

  useEffect(() => {
    const displayedPrice =
      selectedInterval.toLowerCase() === "weekly"
        ? Number(selectedProduct?.price) * 1
        : Number(selectedProduct?.price) * 4.3;

    setDisplayedPrice(displayedPrice);
  }, [selectedInterval]);

  const onMenuClick: MenuProps["onClick"] = async ({ key }) => {
    await onSubmit(key);
  };

  const onSubmit = async (key: string) => {
    try {
      setLoading(true);
      const platforms = (selectedProduct?.assigned_platforms ?? []).map(
        (pl) => pl.platform.name
      );

      await apiUtil.productService.buyProduct({
        product_id: selectedProduct!.id.toString(),
        interval: key.toLowerCase(),
        selected_platforms: platforms,
      });
      setIsNotAvailable(false);
      setIsComplete(true);
      authContext.refreshProfile();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.reason);
        if (error?.response?.data?.reason == "weekly_not_available") {
          setIsNotAvailable(true);
        } else {
          message.error(
            `${
              error?.response?.data?.message ??
              error?.response?.data?.reason ??
              "Unable to complete request"
            }`
          );
        }
      } else {
        message.error("Unable to complete request");
      }
    } finally {
      setLoading(false);
    }
  };

  const onToggleService = (product: IProduct) => {
    setSelectedProduct(product);
  };

  const calcHeight = window.screen.availHeight;
  // window.screen.availHeight - (window.screen.availHeight / 100) * 5;

  const computedHeight = calcHeight; //calcHeight >= 633.65 ? 633.65 : calcHeight;
  const brands = (product?.assigned_platforms ?? []).map(
    (assigned) => assigned.platform.icon
  );

  const onForceMonthly = async () => {
    await onSubmit("monthly");
  };

  const getOptions = () => {
    const price = selectedProduct?.price ?? 0;

    return [
      {
        disabled: true,
        key: "Weekly",
        label: (
          <div className="flex items-center gap-x-3">
            {/*     <Icon icon={"mdi:calendar-weekend"} /> */}
            <Icon icon={"streamline:warning-triangle-solid"} />
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
        key: "Quarterly",
        label: (
          <div className="flex items-center gap-x-3">
            <Icon icon={"ic:baseline-calendar-month"} />
            <DropDownLabelItem label="3 months" amount={price * 12.9} />
          </div>
        ),
      },
    ];
  };

  const utils = new UtilService();
  return (
    <>
      <Drawer
        title={
          !isComplete &&
          !isNotAvailable && (
            <div className="flex flex-end justify-end items-center">
              <Dropdown
                disabled={!selectedProduct}
                menu={{ items: getOptions(), onClick: onMenuClick }}
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
          )
        }
        placement="top"
        height={computedHeight}
        onClose={onClose}
        maskClosable={false}
        open={open}
      >
        {isNotAvailable && (
          <WeeklyWarning loading={loading} onForceMonthly={onForceMonthly} />
        )}
        {isComplete && <OrderComplete loading={loading} onClose={onClose} />}

        {!isNotAvailable && !isComplete && product && (
          <div className="flex flex-col items-start py-6">
            <div className=" px-6">
              <Brands size="small" brands={brands} />
            </div>

            <div className="mt-4 mb-1 px-3 flex justify-between items-center w-full">
              <span className="text-lg">{product?.title}</span>
              {selectedProduct && (
                <span className=" text-foreground-secondary">
                  {utils.formatMoney(`${displayedPrice * 100}`, "en-NG", "NGN")}{" "}
                  /{" "}
                  <Switch
                    checkedChildren="Weekly"
                    unCheckedChildren="Monthly"
                    defaultChecked
                    onChange={(checked) =>
                      setSelectedInterval(checked ? "Weekly" : "Monthly")
                    }
                  />
                </span>
              )}
              {/*  <span className=" text-foreground-secondary text-sm">
                From{" "}
                {utils.formatMoney(`${displayedPrice * 100}`, "en-NG", "NGN")} /{" "}
                {" week "}
              </span> */}
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
                  Select a product and make payment
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-col px-3 w-full gap-y-2">
              {productChildren!.map((productChild) => {
                const platforms = (productChild?.assigned_platforms ?? []).map(
                  (pl) => pl.platform
                );

                const platform = platforms.length > 0 ? platforms[0] : null;
                const platformName = platform?.name;
                const platformIcon = platform?.icon;

                return (
                  <div
                    onClick={() => onToggleService(productChild)}
                    className="w-full flex justify-between items-center gap-x-3 h-10 cursor-pointer hover:bg-slate-100 transition-all duration-100 rounded-md"
                  >
                    <div className="flex items-center gap-x-3">
                      <img src={platformIcon} className="w-6 h-6" />
                      <span className="text-sm">{platformName}</span>
                    </div>

                    <div>
                      <Icon
                        icon={
                          selectedProduct?.title == productChild.title
                            ? "icon-park-solid:check-one"
                            : "gg:radio-check"
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default ProductChildrenDrawer;
