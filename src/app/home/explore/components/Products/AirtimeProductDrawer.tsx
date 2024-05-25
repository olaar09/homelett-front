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
  Select,
} from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import Brands from "@/app/components/Brands";
import { Str } from "@/utils/consts";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";
import UtilService from "@/services/UtilService";
import { IProduct } from "@/app/interfaces/IProduct";
import { AuthContext } from "@/contexts/AuthContext";
import InputField from "@/app/components/InputField";
import ACButton from "@/app/components/Button";

const buyAirtimeOption = "Buy Airtime";
const buyDataOption = "Buy Mobile data";

// Define types for the component props
interface DrawerProps {
  product: IProduct | null;
  open: boolean;
  promo: { label: string; logo: string };
  onClose: () => void;
}

const AirtimeProductDrawer: React.FC<DrawerProps> = ({
  product,
  promo,
  onClose,
  open,
}) => {
  const { Option } = Select;

  const apiUtil = new APIUtil();
  const [loading, setLoading] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState(buyAirtimeOption);

  const [enterPromo, setEnterPromo] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    data_plan: null,
    amount: "",
  });

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (open) setSelectedInterval(buyAirtimeOption);
  }, [open]);

  const onMenuClick = async () => {
    try {
      setLoading(true);
      if (selectedInterval === buyDataOption && !formData.data_plan) {
        message.error("Select a data plan to continue");
        return;
      }

      await apiUtil.productService.buyAirtimeProduct({
        product_id: product!.id.toString(),
        ...formData,
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

  const calcHeight =
    window.screen.availHeight - (window.screen.availHeight / 100) * 5;

  const computedHeight = calcHeight >= 633.65 ? 633.65 : calcHeight;
  const brands = (product?.assigned_platforms ?? []).map(
    (assigned) => assigned.platform.icon
  );

  const utils = new UtilService();

  const handleSend = (e: any) => {
    e.preventDefault();
    onMenuClick();
  };

  const onSetFormData = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };
  return (
    <>
      <Drawer
        placement="top"
        height={computedHeight}
        onClose={onClose}
        maskClosable={false}
        open={open}
      >
        {product && (
          <form
            onSubmit={handleSend}
            className="flex flex-col items-start py-6"
          >
            <div className=" px-6">
              <Brands size="small" brands={brands} />
            </div>

            <div className="mt-4 mb-1 px-3 flex justify-between items-center w-full">
              <span className="text-sm">{product?.title}</span>
              <span className=" text-foreground-secondary">
                <Switch
                  checkedChildren={"Switch to Mobile data"}
                  unCheckedChildren={"Switch to Airtime"}
                  defaultChecked
                  onChange={(checked) =>
                    setSelectedInterval(
                      checked ? buyAirtimeOption : buyDataOption
                    )
                  }
                />
              </span>
            </div>

            <div className="flex items-center px-3  w-full mt-4">
              {selectedInterval === buyDataOption && (
                <div className="text-black flex flex-col w-full mt-4">
                  <span className="block pb-4 text-sm font-bold">Buy Data</span>
                  <div className="flex flex-col gap-y-2 mb-8">
                    <span className=" text-foreground-secondary">
                      Data plan
                    </span>
                    <Select
                      placeholder="Select data plan"
                      className="w-full h-9"
                      value={formData.data_plan}
                      onChange={(val) => onSetFormData("data_plan", val)}
                    >
                      {(Str.dataPlans as any)[
                        product!.assigned_platforms[0]!.platform.name.toLocaleLowerCase()
                      ].map((col: any) => (
                        <Option key={col.label} value={col.value}>
                          {col.label}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              )}

              {selectedInterval === buyAirtimeOption && (
                <div className="text-black flex flex-col w-full mt-4 ">
                  <span className="block pb-4 text-sm font-bold">
                    Buy Airtime
                  </span>

                  <div className="flex flex-col gap-y-2 mb-8">
                    <span className=" text-foreground-secondary">
                      Airtime amount
                    </span>
                    <InputField
                      placeHolder={"Enter amount to recharge"}
                      type={""}
                      name={"amount"}
                      value={formData.amount}
                      required
                      onChange={(val) =>
                        onSetFormData("amount", val.target.value)
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-y-2 mb-8 w-full px-3">
              <span className=" text-foreground-secondary">Phone number</span>
              <InputField
                placeHolder={"Enter phone number to recharge"}
                type={""}
                name={"phone"}
                value={formData.phone}
                required
                onChange={(val) => onSetFormData("phone", val.target.value)}
              />
            </div>
            <div className="mt-4  flex flex-col gap-y-2 w-full px-3">
              <div>
                <Checkbox
                  checked={enterPromo}
                  onChange={(e: any) => setEnterPromo(e.target.checked)}
                >
                  <span className="text-xs text-secondary flex items-center gap-x-3">
                    I want a chance to win one month free {promo.label}
                    <img src={promo.logo} className="w-5 h-5" />
                  </span>
                </Checkbox>
              </div>
              <ACButton text={""} type={"submit"} loading={loading}>
                {!loading && (
                  <Icon className="text-white" icon={"ic:outline-payment"} />
                )}
                <span className="text-xs text-white">
                  Buy{" "}
                  {selectedInterval === buyAirtimeOption ? "airtime" : "data"}{" "}
                </span>
              </ACButton>
            </div>
          </form>
        )}
      </Drawer>
    </>
  );
};

export default AirtimeProductDrawer;
