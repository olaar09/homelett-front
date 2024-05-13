import ACButton from "@/app/components/Button";
import UtilService from "@/services/UtilService";
import { Icon } from "@iconify/react";
import { Modal, Tag } from "antd";

const PricingItem = ({
  items,
  title,
  price,
  loading,
  onClick,
}: {
  price: string;
  items: { title: string; isSoon?: boolean }[];
  title: string;
  loading: boolean;
  onClick: () => void;
}) => {
  const utilService = new UtilService();
  return (
    <div className=" lg:w-6/12 w-full rounded-lg shadow-md  border flex flex-col px-6 py-6 gap-y-4 mx-3">
      <span className={`text-2xl text-gray-500`}> {title} </span>
      <span className={`text-xl font-black text-gray-500`}>
        {utilService.formatMoney(price, "NG", "NGN")}{" "}
      </span>

      <div className=" flex flex-col items-start mt-4 gap-y-4">
        {items.map((text) => {
          return (
            <div className="flex items-center gap-x-1 relative">
              <Icon icon={"lets-icons:check-fill"} className="text-xl" />
              <span className={`text-md text-gray-500`}>{text.title}</span>

              {text.isSoon && (
                <div className="absolute -right-16">
                  <Tag color="volcano">Soon</Tag>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <ACButton
          onClick={onClick}
          inverted={title.toLowerCase() === "monthly"}
          text={"Make payment"}
          type={"button"}
          loading={loading}
          children={undefined}
        />
      </div>
    </div>
  );
};

const PricingModal = ({
  open,
  closeModal,
  onInitPayment,
  loading,
}: {
  open: boolean;
  loading: boolean;
  closeModal: () => void;
  onInitPayment: (plan: string) => void;
}) => {
  const monthly = [
    { title: "Access 400k+ Jobs" },
    { title: "Access to  detailed insights" },
    { title: "Stand out with AI tools" },
    { title: "Use AI Copilot to automatically apply" },
  ];

  const yearly = [
    { title: "Everything in monthly plan" },
    { title: "Access scholarships and grants", isSoon: true },
    { title: "Money back guaranteed (T&C apply) " },
    { title: "Personal onboarding support" },
  ];
  return (
    <Modal
      title=""
      open={open}
      onOk={closeModal}
      onCancel={closeModal}
      closable={false}
      footer={null}
      width={800}
    >
      <>
        <div className="flex flex-col items-center justify-center gap-y-3 py-6">
          <span className="font-black text-2xl block text-center">
            <span className=" text-primary"> 70% </span>of pro users get an
            interview in the <br /> first month. Join them <br />
          </span>
          <span className="block text-center text-gray-500">
            Access 400k+ fresh jobs with deep insights to make your application
            stand out
          </span>
        </div>

        <div className="flex lg:flex-row flex-col gap-y-3 items-center w-11/12 mx-auto my-4">
          <PricingItem
            loading={loading}
            onClick={() => onInitPayment("monthly")}
            price="1000000"
            title="Monthly"
            items={monthly}
          />
          <PricingItem
            loading={loading}
            onClick={() => onInitPayment("yearly")}
            price="5000000"
            title="Yearly"
            items={yearly}
          />
        </div>
      </>
    </Modal>
  );
};

export default PricingModal;
