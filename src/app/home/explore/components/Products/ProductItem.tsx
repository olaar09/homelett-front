import Brands from "@/app/components/Brands";
import Chip from "@/app/components/Chip";
import UtilService from "@/services/UtilService";
import { Str } from "@/utils/consts";
import { shuffleArray } from "@/utils/helpers";

const ProductItem = ({ openProduct, product }: any) => {
  const capitalize = `${(product.tag ?? "").slice(0, 1).toUpperCase()}${(
    product.tag ?? ""
  ).slice(1)}`;

  console.log(
    product?.total_allowed_count,
    Str.brands.slice(0, product?.total_allowed_count)
  );

  const getBrands = [...Str.brands];
  return (
    <div onClick={() => openProduct()} className="px-2  w-full h-28   my-2">
      <div className=" h-full   flex flex-col px-1 rounded-md bg-opacity-80 bg-gray-50 shadow relative">
        <div className="px-3 py-2 justify-between flex items-center ">
          <div className="flex items-center">
            <Brands
              size="small"
              remaining={Str.brands.length - product?.total_allowed_count}
              brands={[
                ...shuffleArray(getBrands).slice(
                  0,
                  product?.total_allowed_count ?? 0
                ),
              ]}
            />
          </div>

          <Chip
            title={capitalize}
            loading={false}
            isSelected={false}
            icon={""}
          />
        </div>
        <div className="flex flex-col mt-1">
          <span className="text-xs ">{product.title}</span>
          <span className="text-xs text-foreground-secondary">
            {new UtilService().formatMoney(product.price, "en-NG", "NGN")} /
            week{" "}
          </span>
        </div>

        <div className="bottom-1 absolute">
          <span className="text-xs text-foreground-secondary">
            {product?.total_allowed}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
