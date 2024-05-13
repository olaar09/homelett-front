"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AddKeyModal from "./_components/AddKeyModal";
import { Button, Tag, Tooltip, message } from "antd";
import NicheProfileDrawer from "./niche_profile/NicheProfile";
import PricingModal from "./apply/JobSide/PricingModal";
import APIUtil from "@/services/APIUtil";
import { usePaystackPayment } from "react-paystack";
import { isMobile } from "react-device-detect";

const NavMenu = ({
  title,
  icon,
  path,
  suffixIcon,
  onClickSuffix,
  tooltip,
}: {
  path: string;
  title: string;
  icon: string;
  suffixIcon?: string;
  onClickSuffix?: any;
  tooltip?: string;
}) => {
  const browserPath = usePathname();
  const [loading, setLoading] = useState(false);

  return (
    <div
      className={`font-body  flex items-center h-10 hover:bg-[#E8E7FF] hover:text-primary hover:font-bold rounded-md px-2 w-full  cursor-pointer  gap-x-3 justify-between  ${
        browserPath.includes(path)
          ? "bg-gray-200 text-foreground font-body "
          : "text-foreground"
      }`}
    >
      <div className="flex items-center gap-x-2">
        <Icon className="text-lg   font-body" icon={icon} />
        <span className="text-md font-thin font-body truncate  ">{title}</span>
      </div>

      {suffixIcon && (
        <Tooltip title={tooltip ?? ""}>
          <div className="z-10">
            <Button
              onClick={onClickSuffix}
              htmlType="submit"
              type="link"
              className="py-0 bg-gray-100"
            >
              <Icon
                className="text-lg font-body text-gray-900"
                icon={suffixIcon}
              />
            </Button>
          </div>
        </Tooltip>
      )}
    </div>
  );
};
const HeadIcon = ({ onToggle, isOpen }: any) => {
  return (
    <div className="flex items-center gap-x-0  h-14   border-b  w-full justify-between px-3 relative">
      <div className="flex items-center">
        <div className="w-6 flex items-center justify-center gap-x-3">
          <img src="/logo.png" className="w-4 mr-2" />
        </div>
        {isOpen && (
          <span className=" text-foreground font-black text-lg mt-0">
            ApplyBase
          </span>
        )}
      </div>

      {isOpen && (
        <Button
          onClick={() => onToggle(false)}
          className="flex items-center mt-1 absolute -right-2"
          type="link"
        >
          {" "}
          <Icon
            className="text-gray-600 text-lg opacity-90"
            icon="lucide:sidebar-close"
          />
        </Button>
      )}
    </div>
  );
};
const Nav: React.FC<any> = ({ children }) => {
  const router = useRouter();
  const path = usePathname();
  const [openSide, setOpenSide] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openNicheDrawer, setOpenNicheDrawer] = useState(false);
  const [amount, setAmount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const authContext = useContext(AuthContext);
  const requiresProfile =
    authContext.currentUser != null &&
    authContext.currentUser?.active_job_profile == null;

  const onLogout = () => {
    localStorage.clear();
    router.push("/");
    authContext.clearUser();
  };

  const onSwitch = () => {
    console.log("open job profiles dropdown");
  };

  const closeNicheDrawer = () => {
    setOpenNicheDrawer(false);
  };

  const onToggle = (status: boolean) => {
    setOpenSide(status);
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: authContext.currentUser?.email,
    amount: amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_0bd51a9b53a2c80ead3d84d11b27e4f51659e5f5",
  };

  const initializePayment = usePaystackPayment(config);
  const apiUtil = new APIUtil();

  const completePayment = async (data: any) => {
    try {
      setLoading(true);
      await apiUtil.profileService.completeUpgradeProfile(data);
      onCloseModal();
      message.success("Payment completed");
      await authContext.refreshProfile();
      setLoading(false);
    } catch (x) {
      message.error("Unable to complete transaction");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (amount > 0) {
      onInitPayment();
    }
  }, [amount]);
  // you can call this function anything
  const onSuccess = (response: any) => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    completePayment(response.reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
    message.error("Payment cancelled");
  };

  const onInitPayment = () => {
    try {
      initializePayment({ onSuccess, onClose });
    } catch (x) {
      message.error("Unable to initialize payment");
      console.log(x, "Error occured");
    } finally {
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onSetAmount = (plan: string) => {
    switch (plan) {
      case "monthly":
        setAmount(10000);
        break;
      case "yearly":
        setAmount(50000);
        break;

      default:
        break;
    }
  };

  const paymentLink = authContext.currentUser?.paymentLink;
  const isFreeTrial =
    authContext.currentUser?.billingCurrentPlan?.name.toLowerCase() === "free";
  const isBillingActive = authContext.currentUser?.billingActive;

  const billingMessage = isFreeTrial
    ? `You have ${authContext.currentUser?.freeTrialLeft} days left on ApplyBase free trial `
    : isBillingActive
    ? "You are currently on a ApplyBase paid plan"
    : "Your current plan is expired. Click below to renew";

  const buttonMessage = isFreeTrial
    ? "Upgrade now "
    : isBillingActive
    ? "Billing active "
    : "Renewal required";

  const buttonIcon = isFreeTrial
    ? "ph:arrow-square-out"
    : isBillingActive
    ? "lets-icons:check-fill"
    : "ph:arrow-square-out";

  const handlePaymentLink = () => {
    /* if (isFreeTrial || !isBillingActive) {
      window.open(paymentLink, "_blank");
    } */
  };

  return (
    <>
      <NicheProfileDrawer open={requiresProfile} onClose={closeNicheDrawer} />
      <PricingModal
        loading={loading}
        onInitPayment={onSetAmount}
        open={openModal}
        closeModal={onCloseModal}
      />

      <div className="min-h-screen w-full overflow-hidden">
        <div className="flex items-center w-full h-full overflow-hidden">
          {isMobile && (
            <div className=" px-3 flex items-center justify-between fixed bottom-0 left-0 right-0 shadow-lg h-20 z-30 bg-white">
              {[
                {
                  path: "/home/apply",
                  icon: "mdi:gesture-touch-box",
                  title: "Apply",
                },
                {
                  path: "/home/applications",
                  icon: "icon-park-solid:all-application",
                  title: "Applications",
                },
                {
                  path: "/home/connections",
                  icon: "material-symbols:integration-instructions-rounded",
                  title: "Connections",
                },
                {
                  path: "/home/profile",
                  icon: "mingcute:profile-fill",
                  title: "Settings",
                },
              ].map((menu) => {
                const browserPath = usePathname();
                const isActive = browserPath.includes(menu.path);
                return (
                  <Link href={menu.path}>
                    <div className="flex flex-col   hover:bg-gray-50 px-2 py-1 rounded-md  transition-all duration-200  items-center justify-center">
                      <Icon
                        icon={menu.icon}
                        className={`text-xl ${
                          isActive ? " text-gray-600" : " text-gray-400"
                        } `}
                      />
                      <span
                        className={`${
                          isActive ? " text-gray-600" : " text-gray-400"
                        } text-sm`}
                      >
                        {menu.title}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          {!isMobile && (
            <div
              className={` bg-background ${
                openSide ? "w-[345px]" : "w-[70px]"
              } min-h-screen hidden lg:flex border-r border-gray-100  flex-col h-full items-start transition-all duration-200 relative `}
            >
              <HeadIcon isOpen={openSide} onToggle={onToggle} />
              {!openSide && (
                <div>
                  <Button
                    onClick={() => onToggle(true)}
                    className="  absolute -left-1"
                    type="link"
                  >
                    {" "}
                    <Icon
                      className="text-gray-600 text-lg opacity-90"
                      icon="lucide:sidebar-close"
                    />
                  </Button>
                </div>
              )}
              {openSide && (
                <div className="flex flex-col items-start gap-y-2 py-5 w-full px-2 ">
                  <Link className="w-full" href={"/home/apply"}>
                    <NavMenu
                      path="/home/apply"
                      icon={"mdi:gesture-touch-box"}
                      title="Apply"
                    />
                  </Link>
                  <Link className="w-full" href={"/home/workflows"}>
                    <NavMenu
                      path="/home/applications"
                      icon={"icon-park-solid:all-application"}
                      title="Job applications"
                    />
                  </Link>
                  <div className="relative w-full">
                    <NavMenu
                      path="/home/api_keys"
                      icon={"material-symbols:analytics-outline"}
                      title="Insights"
                    />
                    <Tag
                      color="volcano"
                      className={`absolute right-1 top-[12px] text-xs`}
                    >
                      coming soon
                    </Tag>
                  </div>

                  <Link className="w-full" href={"/home/connections"}>
                    <NavMenu
                      path="/home/connections"
                      icon={"material-symbols:integration-instructions-rounded"}
                      title="Connections"
                    />
                  </Link>
                </div>
              )}
              {openSide && (
                <div className="flex flex-grow  justify-end flex-col py-3 px-2 w-full ">
                  <div className=" h-40 border rounded-lg my-2 flex flex-col px-3 items-center justify-center gap-y-2 mx-auto w-full">
                    <span className="block text-center text-sm mx-auto w-8/12 font-bold">
                      {billingMessage}
                    </span>

                    <span className="text-xs text-center">
                      Apply for over 100 jobs weekly and increase your chance of
                      getting an interview by 9x
                    </span>
                    <Button
                      className="bg-primary"
                      onClick={onOpenModal}
                      type="primary"
                    >
                      <div className="flex items-center gap-x-2">
                        <span>{buttonMessage}</span>
                        <Icon icon={buttonIcon} />
                      </div>
                    </Button>
                  </div>
                  <div className="flex flex-col border-t w-full py-5">
                    <NavMenu
                      path="/home/name"
                      icon={"mdi:worker"} // todo, show icon based on profile type
                      title={`${authContext.activeProfile?.profession}`}
                      suffixIcon="ic:round-switch-left"
                      tooltip="Switch job profile"
                      onClickSuffix={onSwitch}
                    />

                    <Link className="w-full" href={"/home/profile"}>
                      <NavMenu
                        path="/home/profile"
                        icon={"mingcute:profile-fill"}
                        title="Profile"
                      />
                    </Link>
                    <Link className="w-full" href={"/home/help"}>
                      <NavMenu
                        path="/home/team"
                        icon={"ic:round-help-center"}
                        title="Help"
                      />
                    </Link>

                    {/*       <div onClick={addOpenAiKey} className="relative">
                    <NavMenu
                      path="/home/api_keys"
                      icon={"ph:open-ai-logo-bold"}
                      title="OpenAI Key"
                    />
                    <Icon
                      className={`absolute right-1 top-[10px] text-xl  ${
                        authContext.currentUser?.is_open_ai
                          ? "text-green-500"
                          : "text-red-300"
                      }`}
                      icon={`${
                        authContext.currentUser?.is_open_ai
                          ? "ep:success-filled"
                          : "ic:round-cancel"
                      }`}
                    />
                  </div> */}
                    <div onClick={onLogout}>
                      <NavMenu
                        path={"/logout"}
                        icon={"ri:logout-box-fill"}
                        title={authContext.currentUser?.fullname ?? ""}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="w-full h-screen overflow-hidden ">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Nav;
