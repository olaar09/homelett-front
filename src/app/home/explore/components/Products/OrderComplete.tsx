import { Icon } from "@iconify/react/dist/iconify.js";
import { Tag, Button } from "antd";

const OrderComplete = ({ onClose, loading }: any) => {
  return (
    <div className="h-screen flex flex-col items-center justify-start gap-y-4 px-4 pt-4">
      <img src="/taken.svg" className=" w-40 h-40" />
      <p className="text-center">Your order was completed successfully.</p>{" "}
      <Tag
        color="geekblue"
        className="text-xs text-foreground-secondary text-center break-words text-wrap"
      >
        For any issues with this order, click on your profile and select
        "Contact Support." The Instagram account manager cannot assist with
        complaints or account support.
      </Tag>
      <Tag
        color="cyan"
        className="text-xs text-foreground-secondary text-center break-words text-wrap"
      >
        If you have complaints outside working hours, please be patient for
        support to come online. Do not spam or troll our social account, or your
        account will be automatically blocked.
      </Tag>
      <div className="flex items-center flex-col mt-6 justify-center gap-y-4">
        <Button
          onClick={onClose}
          loading={loading}
          className="bg-primary flex items-center gap-x-3"
          type="primary"
        >
          {!loading && <Icon icon={"material-symbols:subscriptions-rounded"} />}
          <span>Go to my subscription</span>
        </Button>
        {/*               <Button onClick={resetIsNotAvailable} className="" type="link">
        <span className="text-foreground-secondary">
          i'll wait for weekly
        </span>
      </Button> */}
      </div>
    </div>
  );
};

export default OrderComplete;
