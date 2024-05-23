import Brands from "@/app/components/Brands";
import Chip from "@/app/components/Chip";
import { IProduct } from "@/app/interfaces/IProduct";
import UtilService from "@/services/UtilService";
import { Str } from "@/utils/consts";
import { shuffleArray } from "@/utils/helpers";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Tag } from "antd";

const ProductItem = ({
  openProduct,
  product,
}: {
  product: IProduct;
  openProduct: () => void;
}) => {
  const capitalize = `${(product.tag ?? "").slice(0, 1).toUpperCase()}${(
    product.tag ?? ""
  ).slice(1)}`;

  const brands = product.assigned_platforms.map(
    (assigned) => assigned.platform.icon
  );

  return (
    <div
      onClick={() => openProduct()}
      className="px-2  w-full h-28   my-2 border-b border-b-gray-100"
    >
      <div className=" h-full   flex flex-col px-1 rounded-md bg-opacity-80  relative">
        <div className="px-3 py-2 justify-between flex items-center ">
          <div className="flex items-center">
            <Brands size="small" brands={[...brands]} />
          </div>

          <Chip
            title={capitalize}
            loading={false}
            isSelected={false}
            icon={""}
          />
        </div>
        <div className="flex flex-col mt-1">
          <div className="w-full flex justify-between items-center">
            <span className="text-xs ">{product.title}</span>
            {product.extra && (
              <Tag
                color="cyan"
                className="flex items-center gap-x-2 pr-4 text-xs justify-between rounded-lg"
              >
                <span> {product.extra} </span>
                <Icon icon={product.extra_icon} />
              </Tag>
            )}
          </div>

          <span className="text-xs text-foreground-secondary">
            {new UtilService().formatMoney(
              `${product.price * 100}`,
              "en-NG",
              "NGN"
            )}{" "}
            / week{" "}
          </span>
        </div>

        <div className="bottom-1 absolute">
          <span className="text-xs text-foreground-secondary">
            {product?.total_selection}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
