import UtilService from "@/services/UtilService";

const DropDownLabelItem = ({
  label,
  amount,
}: {
  label: string;
  amount: number;
}) => {
  return (
    <div className="w-full flex items-center justify-between gap-x-4">
      <span> {label}</span>
      <span>
        {new UtilService().formatMoney(
          `${Number(amount) * 100}`,
          "en-NG",
          "NGN"
        )}
      </span>
    </div>
  );
};

export default DropDownLabelItem;
