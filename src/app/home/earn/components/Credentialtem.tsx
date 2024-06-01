import { ITransaction } from "@/app/interfaces/IProduct";
import UtilService from "@/services/UtilService";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, Button, Tooltip, Avatar } from "antd";
import moment from "moment";

//      /Users/olaagboola/Downloads/sources/indeed.png /Users/olaagboola/Downloads/sources/linkedin.png /Users/olaagboola/Downloads/sources/turing.png';

const Credentialtem = ({
  applying,
  active,
  onSelectJob,
  onApplyJob,
  transaction,
}: {
  applying: boolean;
  onSelectJob: any;
  onApplyJob: any;
  active: boolean;
  transaction: ITransaction;
}) => {
  const isDebit = transaction.type == "debit";
  return (
    <Card
      onClick={onSelectJob}
      hoverable
      className={`" h-32 border-b border-0 rounded-none flex flex-col relative ${
        active ? "bg-blue-50" : ""
      }`}
    >
      <Card.Meta
        avatar={
          <Avatar
            style={{
              backgroundColor: isDebit ? "#f56a00" : "#4096ff",
              verticalAlign: "middle",
            }}
          >
            {transaction?.type}
          </Avatar>
        }
        title={
          <div className="flex items-center justify-between w-full">
            <div className="items-start block text-wrap font-light  text-sm">
              {transaction?.title?.substring(0, 50)}
              {transaction?.title?.length >= 50 ? "..." : ""}
            </div>

            <span className="text-xs  font-light">
              <span>{transaction.type == "credit" ? "+" : "-"} </span>{" "}
              {new UtilService().formatMoney(
                `${transaction.amount * 100}`,
                "en-NG",
                "NGN"
              )}
            </span>
          </div>
        }
        description={
          <div className="flex flex-col items-start h-full w-full">
            <div className="flex justify-between w-full">
              <span className="text-foreground text-xs text-gray-500">
                {transaction?.description}
              </span>
            </div>
          </div>
        }
      />

      <span className=" pl-12 absolute bottom-2 text-xs text-gray-500">
        {moment(transaction.created_at).format("DD MMM YYYY HH:mm")}
      </span>
    </Card>
  );
};

export default Credentialtem;
