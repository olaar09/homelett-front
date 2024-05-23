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

  const platforms = (subscription?.credentials ?? []).map(
    (cred) => cred?.credential?.platform
  );
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
    const allMapped = (subscription?.credentials ?? []).map((credential) => {
      const icon = credential?.credential?.platform.icon;
      return {
        key: credential?.credential?.id,
        label: (
          <div className="flex items-center gap-x-3">
            {icon && (
              <img
                src={credential?.credential?.platform.icon}
                alt={`brand-${credential?.credential?.platform.name}}`}
                className={`flex w-auto  h-5 bg-[#2A2A2A] rounded-full`}
              />
            )}
            <span>{credential?.credential?.platform.name}</span>
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
                    {credential?.credential?.email}{" "}
                  </span>
                  <Button
                    onClick={() => onCopyText(credential?.credential?.email)}
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
                    {credential?.credential?.password}{" "}
                  </span>
                  <Button
                    onClick={() => onCopyText(credential?.credential?.password)}
                    type="link"
                  >
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
  const brands = (subscription?.credentials ?? [])
    .map((cred) => cred?.credential?.platform.icon)
    .filter((br) => br != null);

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const hasSubscriptions =
    subscription?.credentials && subscription?.credentials.length > 0;
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
        placement="top"
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

              {hasSubscriptions && (
                <div className="flex flex-col items-start mt-4">
                  <span className="text-block text-xs">Selected services</span>
                </div>
              )}
            </div>

            {!hasSubscriptions && (
              <div className="flex flex-col items-center mt-10 px-2 gap-y-4 w-full">
                <span className="block items-center justify-center text-center">
                  Please check back within 24 hours for login details
                </span>
                <span className=" text-foreground-secondary">
                  If over 24 hours,{" "}
                  <a href={Str.whatsappHelp} className="text-primary underline">
                    {" "}
                    Contact support{" "}
                  </a>
                </span>
              </div>
            )}

            <div className="mt-3 flex flex-col px-0 w-full gap-y-2 overflow-y-scroll">
              {hasSubscriptions && (
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  items={getItems(platforms ?? [])}
                />
              )}
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default SubscriptionDrawer;
