import Brands from "@/app/components/Brands";
import Chip from "@/app/components/Chip";
import { Str } from "@/utils/consts";
import EmptyHighlight from "./Empty";
import { ISubscription } from "@/app/interfaces/IRegisterRequest";
import UtilService from "@/services/UtilService";
import SubscriptionDrawer from "./SubscriptionDrawer";
import { useState } from "react";
import moment from "moment";
import { Tag } from "antd";

const Subscriptions = ({
  userSubs,
}: {
  userSubs: ISubscription[] | undefined;
}) => {
  const [selectedSubscription, setSelectedSubscription] =
    useState<ISubscription | null>(null);

  function isExpired(date: string) {
    const now = moment().endOf("day");
    const givenDate = moment(date).startOf("day");

    return givenDate.isBefore(now); // '[]' includes the boundaries
  }

  return (
    <>
      <SubscriptionDrawer
        subscription={selectedSubscription}
        open={selectedSubscription != null}
        onClose={() => setSelectedSubscription(null)}
      />
      <div className="flex flex-col items-center w-full px-3 mt-10">
        {(!userSubs || userSubs.length < 1) && <EmptyHighlight />}

        {userSubs && userSubs!.length > 0 && (
          <div className="mt-0 w-full ">
            <span className=" text-foreground-secondary px-1 text-xs block mb-2 ">
              Your subscriptions
            </span>
            <div className=" flex flex-nowrap overflow-x-scroll">
              {userSubs.map((subscription) => {
                const price =
                  (subscription?.interval === "weekly" ||
                  subscription?.interval === "single"
                    ? subscription.product?.price
                    : (subscription.product?.price ?? 0) * 4.3) ?? 0;

                const brands = (subscription?.credentials ?? [])
                  .map((credential) => {
                    const platform =
                      credential?.platform?.icon ??
                      credential?.credential?.platform?.icon;
                    return platform;
                  })
                  .filter((br) => br != null);

                const expired = isExpired(subscription?.plan_end ?? "");

                return (
                  <div
                    onClick={() => setSelectedSubscription(subscription)}
                    className="px-2 shrink-0 w-7/12 h-20 "
                  >
                    <div className="  h-full flex flex-col px-1 rounded-md bg-opacity-80 bg-gray-100 shadow">
                      <div className="px-3 py-2 justify-between flex items-center ">
                        <Brands size="small" brands={brands} />
                        {expired && (
                          <Tag className="text-xs" color={"volcano"}>
                            <span className=" text-foreground-secondary text-xs">
                              expired
                            </span>
                          </Tag>
                        )}
                        {!expired && (
                          <Chip
                            title={subscription.product?.tag}
                            loading={false}
                            isSelected={false}
                            icon={""}
                            type={"default"}
                          />
                        )}
                      </div>
                      <div className="flex flex-col mt-1">
                        <span className="text-xs line-clamp-1 ">
                          {subscription.product?.title}
                        </span>
                        <span className="text-xs text-foreground-secondary">
                          {new UtilService().formatMoney(
                            `${price * 100}`,
                            "en-NG",
                            "NGN"
                          )}{" "}
                          /{" "}
                          {subscription?.interval === "single"
                            ? "monthly"
                            : subscription?.interval}
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
    </>
  );
};

export default Subscriptions;
