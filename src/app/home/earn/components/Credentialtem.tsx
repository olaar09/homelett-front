import { ITransaction } from "@/app/interfaces/IProduct";
import { ICredential } from "@/app/interfaces/IRegisterRequest";
import UtilService from "@/services/UtilService";
import { Str } from "@/utils/consts";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, Button, Tooltip, Avatar, Tag } from "antd";
import moment from "moment";

//      /Users/olaagboola/Downloads/sources/indeed.png /Users/olaagboola/Downloads/sources/linkedin.png /Users/olaagboola/Downloads/sources/turing.png';

const Credentialtem = ({
  active,
  onSelectCredential,
  credential,
}: {
  applying: boolean;
  onSelectCredential: any;
  onApplyJob: any;
  active: boolean;
  credential: ICredential;
}) => {
  const utilsService = new UtilService();

  const planName = Str.platforms.find(
    (pl) => pl.value === credential?.platform.id.toString()
  )?.pricingName;

  const pricingAmount =
    Str.platforms.find((pl) => pl.value === credential?.platform.id.toString())
      ?.pricingAmount ?? 0;

  const profit =
    Str.platforms.find((pl) => pl.value === credential?.platform.id.toString())
      ?.earning ?? 0;

  const totalROI = pricingAmount + (pricingAmount / 100) * profit;

  const isRejected = credential?.admin_status === "rejected";
  const isApproved = credential?.admin_status === "active";

  return (
    <Card
      onClick={onSelectCredential}
      hoverable
      className={`" h-32 border-b border-0 rounded-none flex flex-col relative ${
        active ? "bg-blue-50" : ""
      }`}
    >
      <Card.Meta
        className="px-0"
        avatar={
          <Avatar
            style={{
              verticalAlign: "middle",
              background: "transparent",
            }}
          >
            <img src={credential?.platform.icon} />
          </Avatar>
        }
        title={
          <div className="flex items-center justify-between w-full">
            <div className="items-start block text-wrap font-light  text-sm">
              {credential?.platform?.name.substring(0, 50)}
              {credential?.platform?.name.length >= 50 ? "..." : ""}
            </div>

            <span className="text-xs  font-light flex items-center">
              <Tag color="cyan" className="text-xs">
                {" "}
                <span>{planName}</span>{" "}
              </Tag>
            </span>
          </div>
        }
        description={
          <div className="flex flex-col items-start h-full w-full">
            <div className="flex justify-between w-full">
              {isRejected && (
                <span className="text-xs">
                  Ensure your login is valid for at least 1 month and paid for
                  the {planName}
                </span>
              )}
              {!isRejected && (
                <span className="text-foreground text-xs text-gray-500">
                  ROI:{" "}
                  {utilsService.formatMoney(
                    `${totalROI * 100}`,
                    "en-NG",
                    "NGN"
                  )}{" "}
                  (+ {profit}%)
                </span>
              )}
            </div>
          </div>
        }
      />

      <span className=" pl-[5.7em] pr-[2em] left-0 right-0 absolute bottom-2 text-xs text-gray-500 justify-between flex items-center">
        {isRejected && (
          <Tag color="volcano" className="text-xs rounded-md">
            Rejected
          </Tag>
        )}

        {!isRejected && !isApproved && (
          <Tag color="green" className="text-xs rounded-md">
            Pending approval
          </Tag>
        )}

        {isApproved && (
          <Tag color="green" className="text-xs rounded-md">
            {" "}
            {credential.next_renewal
              ? `Next payment: ${moment(credential.next_renewal).format(
                  "DD MMM YYYY"
                )}`
              : "Approved"}
          </Tag>
        )}
        <span className="flex items-center gap-x-2">
          <span>Edit</span>
          <Icon
            className="text-foreground-secondary"
            icon={"mingcute:pencil-fill"}
          />
        </span>
      </span>
    </Card>
  );
};

export default Credentialtem;
