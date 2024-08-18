import React, { useContext, useEffect, useState } from "react";
import { Drawer, Checkbox, message, Switch, Select, Tag } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import Brands from "@/app/components/Brands";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";
import UtilService from "@/services/UtilService";
import { IBank, IDataPlan, IProduct } from "@/app/interfaces/IProduct";
import { AuthContext } from "@/contexts/AuthContext";
import InputField from "@/app/components/InputField";
import ACButton from "@/app/components/Button";
import { Str } from "@/utils/consts";
import { useRequest } from "ahooks";

// Define types for the component props
interface DrawerProps {
  open: boolean;
  bankList: any[];
  onClose: () => void;
}

const UpdateBankDrawer: React.FC<DrawerProps> = ({
  bankList,
  onClose,
  open,
}) => {
  const { Option } = Select;

  const apiUtil = new APIUtil();
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const [formData, setFormData] = useState({
    bank_name: "",
    bank_account_number: "",
    bank_account_name: "",
  });

  const apiUtils = new APIUtil();

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (open) {
      onSetFormData("bank_name", "");
      onSetFormData("bank_account_number", "");
      onSetFormData("bank_account_name", "");
      setIsDone(false);
    }
  }, [open]);

  const updateBankDetails = async () => {
    try {
      setLoading(true);
      await apiUtil.profileService.updateBankDetails({
        ...formData,
      });

      authContext.refreshProfile();
      onSuccessClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.reason);

        message.error(
          `${error?.response?.data?.message ??
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

  const handleSend = (e: any) => {
    e.preventDefault();
    updateBankDetails();
  };

  const onSetFormData = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const onSuccessClose = () => {
    onClose();
  };

  const onChangeBank = (value: string) => {
    const bank = (bankList ?? []).find((ls: IBank) => ls.name === value);
    onSetFormData("bank_name", bank.code);
  };

  const bankName = (bankList ?? []).find(
    (ls: IBank) => ls.code === formData.bank_name
  )?.name;

  return (
    <>
      <Drawer
        title={
          <div className="flex flex-end justify-start items-center">
            <span className="text-sm text-foreground">Update bank details</span>
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
            <div className="text-black flex flex-col w-full gap-y-3  mb-4">
              <span className=" text-foreground">Create bank details</span>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mb-6 w-full px-3">
            <span className=" text-foreground-secondary">Bank name</span>
            <Select
              showSearch
              placeholder="Select data plan"
              className="w-full h-9"
              value={bankName}
              onChange={(val) => onChangeBank(val)}
            >
              {(bankList ?? []).map((col: IBank) => (
                <Option key={col.name} value={col.name}>
                  <div className="flex items-center gap-x-2">
                    <span>{col.name} </span>
                  </div>
                </Option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-y-2 mb-6 w-full px-3">
            <span className=" text-foreground-secondary">Account number</span>
            <InputField
              placeHolder={`Enter bank account number`}
              type={""}
              name={"bank_account_number"}
              value={formData.bank_account_number}
              required
              onChange={(val) =>
                onSetFormData("bank_account_number", val.target.value)
              }
            />
          </div>
          <div className="flex flex-col gap-y-2 mb-4 w-full px-3">
            <span className=" text-foreground-secondary">Account name</span>
            <InputField
              placeHolder={"Enter bank account name"}
              type={""}
              name={"bank_account_name"}
              value={formData.bank_account_name}
              required
              onChange={(val) =>
                onSetFormData("bank_account_name", val.target.value)
              }
            />
          </div>

          <div className="px-3">
            <Tag className="text-xs my-1  flex flex-col gap-y-3 py-1">
              <span className="text-xs text-wrap">
                Ensure this bank info is correct. Kornwill not be liable for
                any mistake{" "}
              </span>
            </Tag>
          </div>

          <div className="mt-4  flex flex-col gap-y-2 w-full px-3">
            <ACButton text={""} type={"submit"} loading={loading}>
              {!loading && <Icon className="text-white" icon={"ion:share"} />}
              <span className="text-xs text-white">Update bank details </span>
            </ACButton>
          </div>
        </form>
      </Drawer>
    </>
  );
};

export default UpdateBankDrawer;
