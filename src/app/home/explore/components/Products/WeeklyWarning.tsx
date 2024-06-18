import { Icon } from "@iconify/react/dist/iconify.js";
import { Tag, Button } from "antd";

const WeeklyWarning = ({ onForceMonthly, loading }: any) => {
  return (
    <div className="h-screen flex flex-col items-center justify-start gap-y-4 px-4 pt-10">
      <img src="/taken.svg" className=" w-40 h-40" />
      <p className="text-center">
        Hi chief, all weekly slots for this plan are currently filled up, but
        monthly slots are still available.{" "}
      </p>{" "}
      <Tag
        color="cyan"
        className="text-xs text-foreground-secondary text-center break-words text-wrap"
      >
        If you're a first-time user don't worry, 5k+ users trust us for their
        streaming subs and our monthly plan offers a much better & premium
        experience than weekly
      </Tag>
      <div className="flex items-center flex-col mt-6 justify-center gap-y-4">
        <Button
          onClick={onForceMonthly}
          loading={loading}
          className="bg-primary flex items-center gap-x-3"
          type="primary"
        >
          {!loading && <Icon icon={"ic:baseline-calendar-month"} />}
          <span>Select monthly</span>
        </Button>
        {/*               <Button onClick={resetIsNotAvailable} className="" type="link">
        <span className="text-foreground-secondary">
          i'll wait for weekly
        </span>
      </Button> */}
      </div>
    </div>
  );
};

export default WeeklyWarning;
