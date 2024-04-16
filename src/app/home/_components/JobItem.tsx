import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, Button, Tooltip } from "antd";

const JobItem = ({ active }: { active: boolean }) => {
  return (
    <Card
      hoverable
      className={`" h-48 border-b rounded-none flex flex-col relative ${
        active ? "bg-blue-50" : ""
      }`}
    >
      <Card.Meta
        title={
          <div className="  items-start block text-wrap line-clamp-2">
            Frontend Engineer (Senior / Mid)
          </div>
        }
        description={
          <div className="flex flex-col items-start h-full">
            <span className="text-black text-foreground">Trust Wallet</span>
            <span>United Kingdom (Remote)</span>

            <Button type="link" className="-ml-3">
              <div className="flex items-center mt-2 gap-x-2">
                <Icon className="mt-0 " icon={"lets-icons:out-light"} />
                <span className="mt-0 text-foreground-secondary">View job</span>
              </div>
            </Button>
          </div>
        }
      />

      <div className=" absolute bottom-2 left-3 right-0">
        <div className="flex justify-between items-center w-full ">
          <Button type="link" className=" text-foreground">
            <div className="flex items-center gap-x-2">
              <Icon
                className="mt-0 text-primary"
                icon={"streamline:send-email-solid"}
              />
              <span className="  block">Apply for this job</span>
            </div>
          </Button>

          <div className="flex gap-x-3 px-3">
            <Tooltip title="Remove this job (for this profile)">
              <Button type="link" className=" text-foreground px-0">
                <div className="flex items-center gap-x-2">
                  <Icon className="mt-0" icon={"ic:round-block"} />
                  <span className="  block text-xs">Skip this job</span>
                </div>
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobItem;
