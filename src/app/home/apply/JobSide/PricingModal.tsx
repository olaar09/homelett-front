import { Modal } from "antd";

const PricingModal = ({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) => {
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
      <div className="flex flex-col items-center justify-center gap-y-3">
        <span className="font-black text-xl block text-center">
          <span className=" text-primary"> 70% </span>of pro users get an
          interview in the <br /> first month. Join them <br />
        </span>
        <span className="block text-center text-gray-500">
          Access 400k+ fresh jobs with deep insights to make your application
          stand out
        </span>
      </div>
    </Modal>
  );
};

export default PricingModal;
