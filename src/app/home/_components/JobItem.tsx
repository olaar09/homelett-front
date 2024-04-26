import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, Button, Tooltip, Avatar } from "antd";

const JobItem = ({
  applying,
  active,
  onSelectJob,
  onApplyJob,
  job,
}: {
  applying: boolean;
  onSelectJob: any;
  onApplyJob: any;
  active: boolean;
  job: any;
}) => {
  return (
    <Card
      onClick={onSelectJob}
      hoverable
      className={`" h-44 border-b rounded-none flex flex-col relative ${
        active ? "bg-blue-50" : ""
      }`}
    >
      <Card.Meta
        avatar={<Avatar src={job.company_logo} />}
        title={
          <div className="items-start block text-wrap ">
            {job.title?.substring(0, 50)}
            {job.title?.length >= 50 ? "..." : ""}
          </div>
        }
        description={
          <div className="flex flex-col items-start h-full w-full">
            <div className="flex justify-between w-full">
              <span className="text-black text-foreground">
                {job.company_name}
              </span>
              <Button type="link" className="-ml-3">
                <div className="flex items-center mt-0 gap-x-2">
                  <Icon className="mt-0 " icon={"lets-icons:out-light"} />
                  <span className="mt-0 text-foreground-secondary">
                    View job
                  </span>
                </div>
              </Button>
            </div>

            <span className="-mt-2">{job.location ?? "Remote, World"}</span>
          </div>
        }
      />

      <div className=" absolute bottom-2 left-14 right-0">
        <div className="flex justify-between items-center w-full ">
          <Button
            disabled={applying || job.applied}
            onClick={onApplyJob}
            type="link"
            className=" text-foreground"
          >
            <div className="flex items-center gap-x-2">
              <Icon
                className="mt-0 text-primary"
                icon={`${
                  applying
                    ? "eos-icons:loading"
                    : job.applied
                    ? "lets-icons:check-fill"
                    : "lucide:send"
                }`}
              />

              <span className="  block">
                {job.applied ? "Already applied" : "Apply for this job"}
              </span>
            </div>
          </Button>

          {!job.applied && (
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
          )}
        </div>
      </div>
    </Card>
  );
};

export default JobItem;
