import Brands from "@/app/components/Brands";
import ACButton from "@/app/components/Button";
import { Str } from "@/utils/consts";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "antd";
import Link from "next/link";

const StartEarning = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="h-screen   flex flex-col justify-start mt-10 items-center px-3">
      <img src="/money.png" className=" w-40" />
      <div className="text-center w-full flex justify-center flex-col items-center ">
        <span>
          {" "}
          Earn up to <b> ₦350,000 </b> weekly by sharing your netflix, Show-max
          and Prime video, Spotify premium subscriptions with other users.
        </span>
        <br /> <br />
        <div className="w-4/12 flex justify-center items-center my-2">
          <Brands size={"small"} brands={[...Str.brands]} />
        </div>
        Get started and start earning instantly !
      </div>

      <div className="w-8/12 mx-auto mt-10">
        <ACButton text={""} type={"button"} onClick={onClick} loading={false}>
          <div className="flex items-center gap-x-2 ">
            <Icon icon={"tdesign:money"} className="text-white" />
            <span className="text-white text-sm"> Share subscription </span>
          </div>
        </ACButton>
      </div>

      <Link href={Str.earnChannel}>
        <Button
          type={"link"}
          className="w-full text-center px-0 mt-4 "
          loading={false}
        >
          <div className="flex items-center w-full justify-center gap-x-2 ">
            <Icon icon={"logos:whatsapp-icon"} className="" />
            <span className="  text-sm">
              {" "}
              Join BubbleEarn group to learn more{" "}
            </span>
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default StartEarning;
