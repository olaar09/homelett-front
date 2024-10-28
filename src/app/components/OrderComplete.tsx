import { Str } from "@/utils/consts";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Tag, Button } from "antd";

const OrderComplete = ({ onClose, loading }: any) => {

  const onBecomeReseller = () => {
    window.location.href = 'https://forms.gle/bBrdrvvenmCcDnVu8'
  }

  const onContactSupport = () => {
    window.location.href = Str.whatsappHelp
  }

  return (
    <div className="h-screen flex flex-col items-center justify-start gap-y-4 px-4 pt-4">
      <img src="/taken.svg" className=" w-20 h-20" />
      <p className="text-center text-foreground-secondary">Your order was completed successfully.</p>{" "}



      <div className="flex items-center flex-col mt-4 justify-center gap-y-4">


        <Button
          onClick={onClose}
          loading={loading}
          className=" flex items-center gap-x-3"
          type="primary"
        >
          {!loading && <Icon icon={"material-symbols:subscriptions-rounded"} />}
          <span>View my subscription</span>
        </Button>
        {/*               <Button onClick={resetIsNotAvailable} className="" type="link">
        <span className="text-foreground-secondary">
          i'll wait for weekly
        </span>
      </Button> */}
      </div>
      <Tag
        color=""
        className="text-xs text-foreground-secondary text-center break-words text-wrap"
      >
        If you have any complaints about this order, simply contact support, it will be resolved asap.
      </Tag>
    </div>
  );
};

export default OrderComplete;
