import { AuthContext } from "@/contexts/AuthContext";
import APIUtil from "@/services/APIUtil";
import { Icon } from "@iconify/react";
import { Button, message } from "antd";
import { useContext, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import PricingModal from "./PricingModal";

const Upgrade = ({ email }: any) => {
  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: 50000 * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_0bd51a9b53a2c80ead3d84d11b27e4f51659e5f5",
  };

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const initializePayment = usePaystackPayment(config);
  const apiUtil = new APIUtil();
  const authContext = useContext(AuthContext);

  const completePayment = async (data: any) => {
    try {
      setLoading(true);
      await apiUtil.profileService.completeUpgradeProfile(data);
      message.success("Payment completed");
      await authContext.refreshProfile();
      setLoading(false);
    } catch (x) {
      message.error("Unable to complete transaction");
      setLoading(false);
    }
  };

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

  return (
    <>
      <PricingModal open={openModal} closeModal={onCloseModal} />
      <div className="blur-at-top  absolute h-40  w-full bottom-80 ">
        <span className="text-black"></span>
      </div>
      <div className="absolute h-40  w-full bottom-64 flex flex-col items-center justify-center ">
        <div className="mx-auto w-9/12 flex flex-center flex-col items-center gap-y-4">
          <span className="text-black text-center text-sm">
            <span className="font-bold">
              {" "}
              Apply to over 400k jobs when you upgrade.{" "}
            </span>{" "}
            <br /> <br /> Get the right information you need to apply for jobs
            and 10x your chances of getting hired. Apply with a single click or
            Start an AI Agent to apply to hundreds of job automatically.
          </span>

          <Button
            loading={loading}
            size="large"
            className="bg-primary"
            onClick={onOpenModal}
            type="primary"
          >
            <div className="flex items-center gap-x-2">
              <span>{"Upgrade To Pro"}</span>
              <Icon icon={"buttonIcon"} />
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Upgrade;
