import { Modal } from "antd";

const QueryDisplay = ({
  open,
  onClose,
  query,
}: {
  open: boolean;
  onClose: () => void;
  query: string;
}) => {
  return (
    <Modal
      open={open}
      onCancel={() => onClose()}
      footer={null}
      title={"Generated query"}
    >
      <div className="p-3 flex flex-col mx-auto gap-y-2">
        <div>
          <div className="bg-gray-200 rounded-md my-4 p-2">
            <span className="text-gray-700 text-xs"> {query}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QueryDisplay;
