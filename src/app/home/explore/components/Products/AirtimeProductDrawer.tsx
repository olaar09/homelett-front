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

  const [selectedPlatforms, setSelectedPlatform] = useState<string[]>([]);

  const apiUtil = new APIUtil();
  const [loading, setLoading] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState(buyAirtimeOption);

  const [enterPromo, setEnterPromo] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    data_plan: "",
    amount: "",
  });

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (open) setSelectedInterval(buyAirtimeOption);
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

  const utils = new UtilService();

  const handleSend = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data);
  };

  const onSetFormData = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };
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
                      required
                      onChange={() => {}}
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
                name={"phone_number"}
                required
                onChange={() => {}}
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
              <ACButton text={""} type={"submit"} loading={false}>
                <span className="text-xs text-white">Buy airtime </span>
              </ACButton>
            </div>
          </form>
        )}
      </Drawer>
    </>
  );
};

export default AirtimeProductDrawer;
