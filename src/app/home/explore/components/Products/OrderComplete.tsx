import { Icon } from "@iconify/react/dist/iconify.js";
import { Tag, Button } from "antd";

const OrderComplete = ({ onForceMonthly, loading }: any) => {
  return (
    <div className="h-screen flex flex-col items-center justify-start gap-y-4 px-4 pt-10">
      <img src="/taken.svg" className=" w-40 h-40" />
      <p className="text-center">
        Hi Chief, your order was completed successfully. For any issues with
        this order, click on your profile and select "Contact Support." The
        Instagram account manager cannot assist with complaints or support.
      </p>{" "}
      <Tag
        color="cyan"
        className="text-xs text-foreground-secondary text-center break-words text-wrap"
      >
        If you have complaints outside working hours, please be patient for
        support to come online. Do not spam or troll our accounts, or your
        account will be automatically blocked.
      </Tag>
      <div className="flex items-center flex-col mt-6 justify-center gap-y-4">
        <Button
          onClick={onForceMonthly}
          loading={loading}
          className="bg-primary flex items-center gap-x-3"
          type="primary"
        >
          {!loading && <Icon icon={"ic:baseline-calendar-month"} />}
          <span>Select monthly</span>
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
