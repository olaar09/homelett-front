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

// Define types for the component props
interface DrawerProps {
  open: boolean;
  onClose: () => void;
  refreshCredentials: () => void;
}

const AddCredentialDrawer: React.FC<DrawerProps> = ({
  refreshCredentials,
  onClose,
  open,
}) => {
  const { Option } = Select;

  const apiUtil = new APIUtil();
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    platform_id: "",
  });

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (open) {
      onSetFormData("platform_id", "");
      onSetFormData("email", "");
      onSetFormData("password", "");
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

      await apiUtil.productService.shareCredential({
        ...formData,
      });

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

  const calcHeight =
    window.screen.availHeight - (window.screen.availHeight / 100) * 5;

  const computedHeight = calcHeight >= 633.65 ? 633.65 : calcHeight;

  const utils = new UtilService();

  const handleSend = (e: any) => {
    e.preventDefault();
    onAddCredential();
  };

  const onSetFormData = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const onSuccessClose = () => {
    onClose();
    refreshCredentials();
  };
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
        <form onSubmit={handleSend} className="flex flex-col items-start py-4">
          <div className="flex items-center px-3  w-full">
            <div className="text-black flex flex-col w-full ">
              <div className="flex flex-col gap-y-1 w-full mb-4">
                <span>Terms and conditions</span>
                <Tag
                  className="text-xs my-1  flex flex-col gap-y-3 py-1"
                  color="cyan"
                >
                  <span className="text-xs text-wrap">
                    The login details you enter must be valid, paid for and
                    active. Invalid or unpaid login details will lead to
                    irreversible ban from Bubble earn.{" "}
                  </span>
                </Tag>
              </div>

              <div className="flex flex-col gap-y-2 mb-6">
                <span className=" text-foreground-secondary">
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

          <div className="flex flex-col gap-y-2 mb-6 w-full px-3">
            <span className=" text-foreground-secondary">Service email</span>
            <InputField
              placeHolder={`Enter service email`}
              type={""}
              name={"email"}
              value={formData.email}
              required
              onChange={(val) => onSetFormData("email", val.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2 mb-4 w-full px-3">
            <span className=" text-foreground-secondary">Service Password</span>
            <InputField
              placeHolder={"Enter service password"}
              type={""}
              name={"password"}
              value={formData.password}
              required
              onChange={(val) => onSetFormData("password", val.target.value)}
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
