import React, { useContext, useEffect, useState } from "react";
import { Drawer, Checkbox, message, Switch, Select, Tag } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import Brands from "@/app/components/Brands";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";
import UtilService from "@/services/UtilService";
import { IDataPlan, IProduct } from "@/app/interfaces/IProduct";
import { AuthContext } from "@/contexts/AuthContext";
import InputField from "@/app/components/InputField";
import ACButton from "@/app/components/Button";
import { Str } from "@/utils/consts";
import { ICredential } from "@/app/interfaces/IRegisterRequest";

// Define types for the component props
interface DrawerProps {
  selectedCredential?: ICredential | null;
  open: boolean;
  onClose: () => void;
  refreshCredentials: () => void;
}

const AddCredentialDrawer: React.FC<DrawerProps> = ({
  refreshCredentials,
  onClose,
  open,
  selectedCredential,
}) => {
  const { Option } = Select;

  const apiUtil = new APIUtil();
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    platform_id: "",
    gpassword: "",
    invite_link: "",
    extra_data: "",
  });

  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log(selectedCredential);

    if (open && selectedCredential) {
      setFormData({
        email: selectedCredential.email,
        password: selectedCredential.password,
        platform_id: selectedCredential.platform.id?.toString(),
        gpassword: selectedCredential.gpassword,
        invite_link: selectedCredential.invite_link ?? "",
        extra_data: selectedCredential.extra_data ?? "",
      });
      setIsDone(false);
    } else {
      setFormData({
        email: "",
        password: "",
        platform_id: "",
        gpassword: "",
        invite_link: "",
        extra_data: "",
      });
      setIsDone(false);
    }
  }, [open]);

  const onAddCredential = async () => {
    try {
      setLoading(true);
      if (!formData.platform_id) {
        message.error("Select a platform continue");
        return;
      }

      if (formData.gpassword.toLowerCase() == formData.password.toLowerCase()) {
        message.error(
          "Service password and email password must not be the same"
        );
        return;
      }

      if (selectedCredential) {
        await apiUtil.productService.updateCredential({
          ...formData,
          credential_request_id: selectedCredential!.id.toString(),
        });
      } else {
        await apiUtil.productService.shareCredential({
          ...formData,
        });
      }

      authContext.refreshProfile();
      onSuccessClose();
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

  const calcHeight = window.screen.height;

  const computedHeight = calcHeight; // >= 633.65 ? 633.65 : calcHeight;

  const utils = new UtilService();

  const handleSend = (e: any) => {
    e.preventDefault();
    onAddCredential();
  };

  const onSetFormData = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
    console.log({ ...formData, [key]: value });
  };

  const onSuccessClose = () => {
    onClose();
    refreshCredentials();
  };

  const selectedPlatformName = Str.platforms.find(
    (pl) => pl.value === formData.platform_id
  )?.label;

  const selectedPricingName = Str.platforms.find(
    (pl) => pl.value === formData.platform_id
  )?.pricingName;

  const selectedPricing = Str.platforms.find(
    (pl) => pl.value === formData.platform_id
  )?.pricingAmount;

  return (
    <>
      <Drawer
        title={
          <div className="flex flex-end justify-start items-center">
            <span className="text-sm text-foreground">
              Share new subscription
            </span>
          </div>
        }
        placement="top"
        height={computedHeight}
        onClose={onClose}
        maskClosable={false}
        open={open}
      >
        <form
          onSubmit={handleSend}
          className="flex flex-col items-start py-4 px-2"
        >
          <div className="flex items-center px-3  w-full  rounded-md py-3 border mb-4">
            <div className="text-black flex flex-col w-full ">
              <div className="flex flex-col gap-y-1 w-full mb-4">
                <Tag
                  className="text-xs my-1  flex flex-col gap-y-3 py-1"
                  color="cyan"
                >
                  <span className="text-xs text-wrap">
                    We advise that you create a new gmail for this specific
                    purpose, because we need the gmail password too.
                  </span>
                </Tag>
              </div>

              <div className="flex flex-col gap-y-2 mb-6 ">
                <span className=" text-foreground-secondary text-xs">
                  Select Service
                </span>
                <Select
                  placeholder="Select data plan"
                  className="w-full h-9"
                  value={formData.platform_id}
                  onChange={(val) => onSetFormData("platform_id", val)}
                >
                  {Str.platforms.map((col) => (
                    <Option key={col.label} value={col.value}>
                      <div className="flex items-center gap-x-2">
                        <img src={col.icon} className="w-5" />
                        <span>
                          {col.label}{" "}
                          <Tag className="text-xs rounded-lg" color="volcano">
                            <span className="text-xs">
                              {" "}
                              + {col.earning}% profit{" "}
                            </span>
                          </Tag>
                        </span>
                      </div>
                    </Option>
                  ))}
                </Select>
                {formData.platform_id && (
                  <div className="inline-block">
                    <Tag color="magenta">
                      <span className=" text-foreground-secondary">
                        You must purchase the {selectedPricingName} (
                        {utils.formatMoney(
                          `${selectedPricing! * 100 ?? ""}`,
                          "en-NG",
                          "NGN"
                        )}
                        )
                      </span>
                    </Tag>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mb-6 w-full px-3  rounded-md py-3 border">
            <span className=" text-foreground-secondary text-xs">
              {selectedPlatformName} email
            </span>
            <InputField
              placeHolder={`Enter service email`}
              type={""}
              name={"email"}
              value={formData.email}
              required
              onChange={(val) => onSetFormData("email", val.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2 mb-4 w-full px-3  rounded-md py-3 border">
            <span className=" text-foreground-secondary text-xs">
              {selectedPlatformName} Password
            </span>
            <InputField
              placeHolder={"Enter service password"}
              type={""}
              name={"password"}
              value={formData.password}
              required
              onChange={(val) => onSetFormData("password", val.target.value)}
            />
          </div>

          {formData.platform_id?.toString() == "3" && (
            <div className="flex flex-col gap-y-2 mb-4 w-full px-3  rounded-md py-3 border">
              <span className=" text-foreground-secondary text-xs">
                Spotify family invite link
              </span>
              <InputField
                placeHolder={"Enter invite link for the spotify"}
                type={""}
                name={"invite_link"}
                value={formData.invite_link}
                required
                onChange={(val) =>
                  onSetFormData("invite_link", val.target.value)
                }
              />
            </div>
          )}

          {formData.platform_id?.toString() == "3" && (
            <div className="flex flex-col gap-y-2 mb-4 w-full px-3  rounded-md py-3 border">
              <span className=" text-foreground-secondary text-xs">
                Spotify family address
              </span>
              <InputField
                placeHolder={"The exact address as on spotify"}
                type={""}
                name={"extra_data"}
                value={formData.extra_data}
                required
                onChange={(val) =>
                  onSetFormData("extra_data", val.target.value)
                }
              />
            </div>
          )}

          <div className="flex flex-col gap-y-2 mb-4 w-full px-3  rounded-md py-3 border">
            <span className=" text-foreground-secondary text-xs">
              Gmail Password
            </span>
            <span className=" text-foreground-secondary text-xs">
              So that we can retrieve OTP at anytime
            </span>
            <InputField
              placeHolder={"Enter password for the email provided"}
              type={""}
              name={"gpassword"}
              value={formData.gpassword}
              required
              onChange={(val) => onSetFormData("gpassword", val.target.value)}
            />
          </div>

          <div className="px-3">
            <Tag className="text-xs my-1  flex flex-col gap-y-3 py-1">
              <span className="text-xs text-wrap">
                Once your login is verified. your provided bank account will be
                credited instantly plus the profit specified{" "}
              </span>
            </Tag>
          </div>

          <div className="mt-4  flex flex-col gap-y-2 w-full px-3">
            <ACButton text={""} type={"submit"} loading={loading}>
              {!loading && <Icon className="text-white" icon={"ion:share"} />}
              <span className="text-xs text-white">Share login details </span>
            </ACButton>
          </div>
        </form>
      </Drawer>
    </>
  );
};

export default AddCredentialDrawer;
