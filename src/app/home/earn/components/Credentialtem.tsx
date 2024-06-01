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
  const planName = Str.platforms.find(
    (pl) => pl.value === credential?.platform.id.toString()
  )?.pricingName;

  return (
    <Card
      onClick={onSelectCredential}
      hoverable
      className={`" h-32 border-b border-0 rounded-none flex flex-col relative ${
        active ? "bg-blue-50" : ""
      }`}
    >
      <Card.Meta
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

            <span className="text-xs  font-light">
              <Tag color="cyan" className="text-xs">
                {" "}
                <span>{planName}</span>{" "}
              </Tag>
              {/*  {new UtilService().formatMoney(
                `${transaction.amount * 100}`,
                "en-NG",
                "NGN"
              )} */}
            </span>
          </div>
        }
        description={
          <div className="flex flex-col items-start h-full w-full">
            <div className="flex justify-between w-full">
              <span className="text-foreground text-xs text-gray-500">
                {credential?.platform?.description}
              </span>
            </div>
          </div>
        }
      />

      <span className=" pl-12 absolute bottom-2 text-xs text-gray-500">
        Renews: {moment(credential.next_renewal).format("DD MMM YYYY HH:mm")}
      </span>
    </Card>
  );
};

export default Credentialtem;
