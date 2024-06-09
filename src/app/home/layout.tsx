"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AddKeyModal from "./_components/AddKeyModal";
import { Button, Tag, Tooltip, message } from "antd";
import NicheProfileDrawer from "./niche_profile/NicheProfile";
import PricingModal from "./apply_old/JobSide/PricingModal";
import APIUtil from "@/services/APIUtil";
import { usePaystackPayment } from "react-paystack";
import { isMobile } from "react-device-detect";
import { Str } from "@/utils/consts";
import NoticeDrawers from "./explore/components/Notice/NoticeDrawer";
import Brands from "../components/Brands";
import Chip from "../components/Chip";

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
            Bubble
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
  const [openNotice, setOpenNotice] = useState(false);

  const authContext = useContext(AuthContext);

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
    publicKey: "pk_live_9e5eb617e571c17f13bb79edec147f2dbe40bfe7",
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

  const totalDeposit = authContext.currentUser?.finance?.totalDeposits ?? 0;

  /*   useEffect(() => {
    if (totalDeposit > 0) {
      setOpenNotice(true);
    }
  }, [totalDeposit]); */

  const closeNotice = () => {
    setOpenNotice(false);
  };

  const onClick = () => {
    setOpenNotice(false);
    window.open(Str.earnChannel);
  };
  return (
    <>
      {/*  <NicheProfileDrawer open={requiresProfile} onClose={closeNicheDrawer} /> */}
      <PricingModal
        loading={loading}
        onInitPayment={onSetAmount}
        open={openModal}
        closeModal={onCloseModal}
      />

      <NoticeDrawers
        open={authContext.currentUser?.is_activated == 0}
        onClose={() => {}}
        message={
          <span className="text-center">
            Dear user, Your account has been banned for violating our terms of
            use. Either for using your logins on more than one device, or using
            our services in bad faith.
            <br /> <br />
            You will not be able to use your account anymore and all services
            assigned to you have been revoked.
            <br /> <br />
            Best regards.
          </span>
        }
      />

      <NoticeDrawers
        open={false}
        onClose={closeNotice}
        action={"Start earning"}
        title={"Bubble Earn"}
        icon={"bi:cash-coin"}
        onClick={() => onClick()}
        message={
          <div className="text-center w-full flex justify-center flex-col items-center ">
            <span>
              {" "}
              Dear user, Would you like to earn up to <b> ₦350,000 </b> weekly
              by sharing your netflix, show-max and prime video subscriptions
              with others?
            </span>
            <br /> <br />
            <div className="w-4/12 flex justify-center items-center my-2">
              <Brands size={"small"} brands={[...Str.brands].splice(2, 3)} />
            </div>
            Contact us to started earning today !.
          </div>
        }
      />

      <div className="min-h-screen w-full overflow-hidden">
        <div className="flex items-center w-full h-full overflow-hidden">
          {isMobile && (
            <div className="px-3 border-t flex items-center justify-between fixed bottom-0 left-0 right-0 shadow-2xl h-20 z-30 bg-white">
              {[
                {
                  path: "/home/explore",
                  icon: "icon-park-solid:all-application",
                  title: "Explore",
                },
                {
                  path: "/home/transactions",
                  icon: "uim:history",
                  title: "History",
                },
                {
                  path: "/home/earn",
                  icon: "majesticons:money-plus-line",
                  title: "Earn",
                  isNew: false,
                },
                {
                  path: "/home/profile",
                  icon: "iconamoon:profile-fill",
                  title: "Profile",
                },
              ].map((menu) => {
                const browserPath = usePathname();
                const isActive = browserPath.includes(menu.path);
                return (
                  <Link href={menu.path}>
                    <div className="flex flex-col  gap-y-1  hover:bg-gray-50 px-2 py-1 rounded-md  transition-all duration-200  items-center justify-center relative">
                      {menu.isNew && (
                        <div className="absolute animate-bounce -right-1 top-0 ">
                          <Chip
                            loading={false}
                            isSelected={false}
                            icon={""}
                            type="badge"
                            title={""}
                          />
                        </div>
                      )}

                      <Icon
                        icon={menu.icon}
                        className={`text-lg ${
                          menu.isNew ? "text-primary" : ""
                        } ${isActive ? " text-gray-600" : " text-gray-400"} `}
                      />
                      <span
                        className={` ${menu.isNew ? "text-primary" : ""} ${
                          isActive ? " text-gray-600" : " text-gray-400"
                        } text-xs`}
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
                  {authContext.currentUser &&
                    !authContext.currentUser?.is_admin && (
                      <Link className="w-full" href={"/home/explore"}>
                        <NavMenu
                          path="/home/explore"
                          icon={"icon-park-solid:all-application"}
                          title="Explore"
                        />
                      </Link>
                    )}

                  {authContext.currentUser &&
                    authContext.currentUser!.is_admin === 1 && (
                      <Link
                        className="w-full"
                        href={"/home/credentials_request"}
                      >
                        <NavMenu
                          path="/home/credentials_request"
                          icon={"mdi:folder"}
                          title="Credential requests"
                        />
                      </Link>
                    )}

                  {authContext.currentUser &&
                    authContext.currentUser!.is_admin === 1 && (
                      <Link
                        className="w-full"
                        href={"/home/credentials_rejected"}
                      >
                        <NavMenu
                          path="/home/credentials_rejected"
                          icon={"fluent:text-change-reject-24-filled"}
                          title="Rejected credentials"
                        />
                      </Link>
                    )}

                  {authContext.currentUser &&
                    authContext.currentUser!.is_admin === 1 && (
                      <Link
                        className="w-full"
                        href={"/home/credentials_manage"}
                      >
                        <NavMenu
                          path="/home/credentials_manage"
                          icon={"material-symbols:folder-managed-sharp"}
                          title="Manage credentials"
                        />
                      </Link>
                    )}

                  {authContext.currentUser &&
                    !authContext.currentUser?.is_admin && (
                      <Link className="w-full" href={"/home/connections"}>
                        <NavMenu
                          path="/home/history"
                          icon={"uim:history"}
                          title="History"
                        />
                      </Link>
                    )}
                </div>
              )}
              {openSide && (
                <div className="flex flex-grow  justify-end flex-col py-3 px-2 w-full ">
                  <div className="flex flex-col border-t w-full py-5">
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
                        icon={"logos:whatsapp-icon"}
                        title="Help"
                      />
                    </Link>

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
