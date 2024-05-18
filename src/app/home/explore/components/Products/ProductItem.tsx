import Brands from "@/app/components/Brands";
import Chip from "@/app/components/Chip";
import { Str } from "@/utils/consts";

const ProductItem = () => {
  return (
    <div className="px-2  w-full h-28   my-2">
      <div className=" h-full   flex flex-col px-1 rounded-md bg-opacity-80 bg-gray-50 shadow">
        <div className="px-3 py-2 justify-between flex items-center ">
          <Brands size="small" brands={Str.brands} />
          <Chip title="Basic" loading={false} isSelected={false} icon={""} />
        </div>
        <div className="flex flex-col mt-1">
          <span className="text-xs ">Entertainment</span>
          <span className="text-xs text-foreground-secondary">
            250 / month{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
