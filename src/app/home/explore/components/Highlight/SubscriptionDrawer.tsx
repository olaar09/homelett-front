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
  Tag,
} from "antd";
import { IChat } from "@/app/interfaces/IChatItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import Brands from "@/app/components/Brands";
import { Str } from "@/utils/consts";
import { hashValue, shuffleArray } from "@/utils/helpers";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";
import UtilService from "@/services/UtilService";
import { IPlatform, IProduct } from "@/app/interfaces/IProduct";
import { AuthContext } from "@/contexts/AuthContext";
import { ISubscription } from "@/app/interfaces/IRegisterRequest";
import { CaretRightOutlined, RedoOutlined } from "@ant-design/icons";
import { text } from "stream/consumers";
import { theme } from "antd";
import ACButton from "@/app/components/Button";
import moment from "moment";

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

  const onResetSubscription = async () => {
    try {
      setLoading(true);
      await apiUtil.subscriptionService.resetSubscription({
        subscription_id: subscription!.id.toString(),
      });

      message.success(
        "You have been refunded the subscription amount to purchase a new subscription"
      );
      await authContext.refreshProfile();
    } catch (error) {
      if (error instanceof AxiosError) {
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

  const onRenewSubscription = async () => {
    try {
      setLoading(true);
      await apiUtil.subscriptionService.renewSubscription({
        subscription_id: subscription!.id.toString(),
      });

      message.success("Subscription renewal successful, refresh to see update");
      await authContext.refreshProfile();
    } catch (error) {
      if (error instanceof AxiosError) {
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

  const onRefreshCredential = async (platform: string) => {
    try {
      setLoading(true);
      await apiUtil.subscriptionService.requestSubscriptionCredential({
        subscription_id: subscription!.id.toString(),
        selected_platform: platform,
      });
      message.success("Credential request successful, refresh to see update");
      await authContext.refreshProfile();
    } catch (error) {
      if (error instanceof AxiosError) {
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
      const icon =
        credential?.platform?.icon ?? credential?.credential?.platform?.icon;
      const name =
        credential?.platform?.name ?? credential?.credential?.platform?.name;
      const assignedCredential = credential?.credential;

      const platformId =
        credential?.platform?.id ?? credential?.credential?.platform?.id;

      console.log(icon);

      return {
        key: credential?.credential?.id,
        label: (
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-x-3">
              {icon && (
                <img
                  src={icon}
                  alt={`brand-image}`}
                  className={`flex w-auto  h-5 bg-[#2A2A2A] rounded-full`}
                />
              )}
              <span>{name}</span>
            </div>

            {!assignedCredential && (
              <Button
                type="link"
                icon={<RedoOutlined />}
                loading={loading}
                className="p-0 m-0 h-6"
                onClick={(e) => {
                  e.stopPropagation();
                  onRefreshCredential(platformId.toString());
                }}
              >
                <Icon icon={""} />
                <span> Refresh</span>
              </Button>
            )}
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
                    {credential?.credential?.email ??
                      "pending, refresh after 24 hours"}{" "}
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
                    {credential?.credential?.password ??
                      "pending, refresh after 24 hours"}{" "}
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

  function isWithinThreeDays(date: string) {
    const now = moment().startOf("day");
    const threeDaysFromNow = moment().add(3, "days").startOf("day");
    const givenDate = moment(date).startOf("day");

    return givenDate.isBetween(now, threeDaysFromNow, null, "[]"); // '[]' includes the boundaries
  }

  return (
    <>
      <Drawer
        title={
          <div className="flex flex-end justify-end items-center">
            {isWithinThreeDays(subscription?.plan_end ?? "") && (
              <Button
                onClick={() => onRenewSubscription()}
                loading={loading}
                className="bg-primary flex items-center gap-x-3"
                type="primary"
              >
                {!loading && <Icon icon={"ic:outline-payment"} />}
                <span>Renew subscription</span>
              </Button>
            )}
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
              <div>
                <span className=" text-foreground-secondary">
                  {new UtilService().formatMoney(
                    `${product?.price * 100}`,
                    "en-NG",
                    "NGN"
                  )}{" "}
                  / weekly
                </span>
              </div>
            </div>

            <div className="px-3">
              <span className="text-[0.75em] text-foreground-secondary">
                {product?.title.replaceAll(" ", "").toLocaleUpperCase()}-
                {subscription?.id}_{hashValue(`${subscription?.id}hash`)}
              </span>
            </div>

            <div className="px-3 mt-2 mb-2">
              <Tag className="text-xs" color="cyan">
                <span className=" text-foreground-secondary text-xs">
                  Plan Ends:{" "}
                  {moment(subscription.plan_end).format("DD MMM YYYY")}
                </span>
              </Tag>
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
                  <Button
                    type="link"
                    onClick={onResetSubscription}
                    className="text-primary underline"
                  >
                    {" "}
                    If over 24 hours, Reset your subscription{" "}
                  </Button>
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
