import React, { CSSProperties, useContext, useEffect, useState } from "react";
import {
  Drawer,
  List,
  Button,
  Checkbox,
  GetProp,
  Dropdown,
  MenuProps,
  message,
  Collapse,
  CollapseProps,
} from "antd";
import { IChat } from "@/app/interfaces/IChatItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import Brands from "@/app/components/Brands";
import { Str } from "@/utils/consts";
import { shuffleArray } from "@/utils/helpers";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";
import UtilService from "@/services/UtilService";
import { IPlatform, IProduct } from "@/app/interfaces/IProduct";
import { AuthContext } from "@/contexts/AuthContext";
import { ISubscription } from "@/app/interfaces/IRegisterRequest";
import { CaretRightOutlined } from "@ant-design/icons";
import { text } from "stream/consumers";
import { theme } from "antd";

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
  subscription: ISubscription | null;
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

const SubscriptionDrawer: React.FC<DrawerProps> = ({
  subscription,
  onClose,
  open,
}) => {
  const { token } = theme.useToken();
  const [selectedPlatforms, setSelectedPlatform] = useState<string[]>([]);

  const apiUtil = new APIUtil();
  const product = subscription?.product;

  const [loading, setLoading] = useState(false);

  const platforms = product?.assigned_platforms.map((pl) => pl.platform);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (open) setSelectedPlatform([]);
  }, [open]);

  const onMenuClick: MenuProps["onClick"] = async ({ key }) => {
    try {
      setLoading(true);
      await apiUtil.productService.buyProduct({
        product_id: product!.id.toString(),
        interval: key,
        selected_platforms: selectedPlatforms,
      });
      onClose();
      authContext.refreshProfile();
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

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const onCopyText = async (text: string) => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
      message.success("Text copied");
    } else {
      document.execCommand("copy", true, text);
      message.success("Text copied");
    }
  };
  const getItems: (platforms: IPlatform[]) => CollapseProps["items"] = (
    platforms
  ) => {
    const allMapped = platforms.map((pl) => {
      return {
        key: pl.id,
        label: (
          <div className="flex items-center gap-x-3">
            <img
              src={pl.icon}
              alt={`brand-${pl.name}`}
              className={`flex w-auto  h-5 bg-[#2A2A2A] rounded-full`}
            />
            <span>{pl.name}</span>
          </div>
        ),
        children: (
          <div>
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center justify-between">
                <span className=" text-foreground-secondary text-xs">
                  Email:{" "}
                </span>
                <div className="flex items-center">
                  <span className=" text-foreground-secondary text-xs">
                    agboolar09@gmail.com{" "}
                  </span>
                  <Button
                    onClick={() => onCopyText("agboolar09@gmail.com")}
                    type="link"
                  >
                    <Icon icon={"solar:copy-bold"} />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className=" text-foreground-secondary text-xs">
                  Password:{" "}
                </span>
                <div className="flex items-center">
                  <span className=" text-foreground-secondary text-xs">
                    1111MJENDJ
                  </span>
                  <Button onClick={() => onCopyText("1111MJENDJ")} type="link">
                    <Icon icon={"solar:copy-bold"} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ),
        style: panelStyle,
      };
    });

    return allMapped;
  };

  const calcHeight =
    window.screen.availHeight - (window.screen.availHeight / 100) * 5;

  const computedHeight = calcHeight >= 633.65 ? 633.65 : calcHeight;
  const brands = (product?.assigned_platforms ?? []).map(
    (assigned) => assigned.platform.icon
  );

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <>
      <Drawer
        title={
          <div className="flex flex-end justify-end items-center">
            {/*        <Dropdown
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
                <span>Renew subscription</span>
              </Button>
            </Dropdown> */}
          </div>
        }
        placement="bottom"
        height={computedHeight}
        onClose={onClose}
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
                <p>
                  You must not share the credentials with anyone, if sharing is
                  detected, you will be banned immediately forever. Sharing
                  credentials directly prevents other users from enjoying the
                  services they have paid for.
                </p>
              </div>

              <div className="flex flex-col items-start mt-4">
                <span className="text-block text-xs">Selected services</span>
              </div>
            </div>

            <div className="mt-3 max-h-96 flex flex-col px-3 w-full gap-y-2 overflow-y-scroll">
              <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                items={getItems(platforms ?? [])}
              />
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default SubscriptionDrawer;
