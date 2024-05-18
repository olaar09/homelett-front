import Brands from "@/app/components/Brands";
import Chip from "@/app/components/Chip";
import { Str } from "@/utils/consts";
import EmptyHighlight from "./Empty";

const Highlight = ({ userSubs }: { userSubs: any }) => {
  return (
    <div className="flex flex-col items-center w-full px-3 mt-10">
      {(!userSubs || userSubs.length < 1) && true && <EmptyHighlight />}

      {(false || (userSubs && userSubs!.length > 0)) && (
        <div className="mt-0 w-full ">
          <span className=" text-foreground-secondary px-1 text-xs block mb-2 ">
            Your subscriptions
          </span>
          <div className=" flex flex-nowrap overflow-x-scroll">
            {[
              {
                plan: {
                  title: "Premium entertainment",
                  platforms: [
                    { logo: Str.brands[0] },
                    { logo: Str.brands[1] },
                    { logo: Str.brands[2] },
                  ],
                },
              },
              2,
              3,
            ].map((subscription) => {
              const selected = [...Str.brands].slice(0, 3);
              return (
                <div className="px-2 shrink-0 w-7/12 h-20 ">
                  <div className="  h-full flex flex-col px-1 rounded-md bg-opacity-80 bg-gray-100 shadow">
                    <div className="px-3 py-2 justify-between flex items-center ">
                      <Brands size="small" brands={selected} />
                      <Chip
                        title="Basic"
                        loading={false}
                        isSelected={false}
                        icon={""}
                      />
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
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Highlight;
