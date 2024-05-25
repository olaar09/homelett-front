import Brands from "@/app/components/Brands";
import Chip from "@/app/components/Chip";
import { IProduct } from "@/app/interfaces/IProduct";
import UtilService from "@/services/UtilService";
import { Str } from "@/utils/consts";
import { shuffleArray } from "@/utils/helpers";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Tag } from "antd";

const winnings = {
  Airtel: {
    logo: "/logos/nt.png",
    label: "Netflix",
  },
  MTN: {
    logo: "/logos/sp.png",
    label: "Spotify",
  },
  "9Mobile": {
    logo: "/logos/yt.webp",
    label: "Youtube premium",
  },
  Glo: {
    logo: "/logos/sm.png",
    label: "Showmax",
  },
};
const AirtimeProductItem = ({
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

  const weekPrice = new UtilService().formatMoney(
    `${product.price * 100}`,
    "en-NG",
    "NGN"
  );

  const monthPrice = new UtilService().formatMoney(
    `${product.price * 100 * 4.3}`,
    "en-NG",
    "NGN"
  );

  const platformName = product.assigned_platforms[0].platform.name;
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
                className="flex items-center gap-x-2 pr-4 text-[0.65rem] justify-between rounded-lg"
              >
                <span> {product.extra} </span>
                <Icon icon={product.extra_icon} />
              </Tag>
            )}
          </div>

          <div className="flex items-center w-96">
            <Tag
              color="cyan"
              className="flex items-center gap-x-4 px-1 text-[0.65rem] justify-between rounded-lg"
            >
              <span className="flex items-center gap-x-2">
                <span>
                  {" "}
                  Buy at least ₦500 to win 1 month free{" "}
                  {(winnings as any)[platformName]?.label}{" "}
                </span>
                <img
                  src={(winnings as any)[platformName]?.logo}
                  className="h-4 w-4 rounded-full"
                />
              </span>
            </Tag>
          </div>
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

export default AirtimeProductItem;
