import React, { useState } from "react";
import {
  Drawer,
  List,
  Button,
  Checkbox,
  GetProp,
  Dropdown,
  MenuProps,
  message,
} from "antd";
import { IChat } from "@/app/interfaces/IChatItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import Brands from "@/app/components/Brands";
import { Str } from "@/utils/consts";
import { shuffleArray } from "@/utils/helpers";

const payOptions: MenuProps["items"] = [
  {
    key: "weekly",
    label: (
      <div className="flex items-center gap-x-3">
        <Icon icon={"mdi:calendar-weekend"} />
        <div>Weekly</div>
      </div>
    ),
  },
  {
    key: "monthly",
    label: (
      <div className="flex items-center gap-x-3">
        <Icon icon={"ic:baseline-calendar-month"} />
        <div> Monthly </div>
      </div>
    ),
  },
];

// Define types for the component props
interface DrawerProps {
  product: any;
  open: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

const ProductDrawer: React.FC<DrawerProps> = ({
  product,
  onSubscribe,
  onClose,
  open,
}) => {
  const handleItemClick = (item: any) => {
    onSubscribe();
  };

  const [selectedPlatforms, setSelectedPlatform] = useState<string[]>([]);

  const isUltimate = product?.total_allowed_count === Str.brands.length;

  const platforms = [
    { label: "Netflix", value: "1", logo: Str.brands[3] },
    { label: "Showmax", value: "2", logo: Str.brands[4] },
    { label: "Spotify", value: "3", logo: Str.brands[1] },
    { label: "Windscribe VPN", value: "4", logo: Str.brands[5] },
    { label: "Youtube premium", value: "5", logo: Str.brands[0] },
    { label: "Prime video", value: "6", logo: Str.brands[2] },
  ];

  const onMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "source") {
    } else {
      message.warning(`Please upgrade to plus plan use this feature`);
    }
  };

  const onToggleService = (platform: any) => {
    const index = selectedPlatforms.indexOf(platform);
    if (index === -1) {
      if (selectedPlatforms.length + 1 > product?.total_allowed_count) {
        message.warning(product?.total_allowed);
      } else {
        setSelectedPlatform([...selectedPlatforms, platform]);
      }
    } else {
      const cloned = [...selectedPlatforms];
      cloned.splice(index, 1);
      setSelectedPlatform(cloned);
    }
  };

  const calcHeight =
    window.screen.availHeight - (window.screen.availHeight / 100) * 5;

  const computedHeight = calcHeight >= 633.65 ? 633.65 : calcHeight;

  return (
    <>
      <Drawer
        title={
          <div className="flex flex-end justify-end items-center">
            <Dropdown
              disabled={
                selectedPlatforms.length < product?.total_allowed_count ?? 0
              }
              menu={{ items: payOptions, onClick: onMenuClick }}
              placement="bottom"
            >
              <Button
                className="bg-primary flex items-center gap-x-3"
                type="primary"
              >
                <Icon icon={"ic:outline-payment"} />
                <span>Make payment</span>
              </Button>
            </Dropdown>
          </div>
        }
        placement="bottom"
        height={computedHeight}
        onClose={onClose}
        open={open}
      >
        {product && (
          <div className="flex flex-col items-start py-6">
            <div className=" px-6">
              <Brands size="small" brands={[...Str.brands]} />
            </div>

            <div className="mt-4 mb-1 px-3">
              <span className="text-lg">{product?.title}</span>
            </div>

            {/*      <div className="px-3">
              <span className="text-xs text-gray-500">
                {product?.total_allowed}
              </span>
            </div> */}

            <div className="px-3  max-h-80 overflow-y-scroll mt-2">
              <span className="block">Terms of use</span>
              <div className="text-xs gap-y-2 text-gray-500 flex flex-col pt-1">
                {!isUltimate && (
                  <p>
                    {" "}
                    You may select only {product?.total_allowed_count} of the
                    services presented in the options.
                  </p>
                )}
                <p>
                  You must not share the credentials with anyone, if sharing is
                  detected, you will be banned immediately forever. Sharing
                  credentials directly prevents other users from enjoying the
                  services they have paid for.
                </p>
              </div>

              <div className="flex flex-col items-start mt-4">
                <span className="text-block text-xs">
                  {product?.total_allowed}
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-col px-3 w-full gap-y-2">
              {platforms.map((pl) => (
                <div
                  onClick={() => onToggleService(pl.label)}
                  className="w-full flex justify-between items-center gap-x-3 h-10 cursor-pointer hover:bg-slate-100 transition-all duration-100 rounded-md"
                >
                  <div className="flex items-center gap-x-3">
                    <img src={pl.logo} className="w-6 h-6" />
                    <span className="text-sm">{pl.label}</span>
                  </div>

                  <div>
                    <Icon
                      icon={
                        selectedPlatforms.includes(pl.label)
                          ? "icon-park-solid:check-one"
                          : "gg:radio-check"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default ProductDrawer;
