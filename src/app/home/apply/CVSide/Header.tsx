import { Avatar } from "antd";

const HeaderSide = () => {
  return (
    <div className="w-full flex flex-col items-center h-48  pt-4">
      <Avatar
        shape="square"
        className="w-32 h-32"
        size={"large"}
        src={"/sample.png"}
      />
      <div className="flex flex-col items-center mt-2">
        <span className="font-black text-2xl">Agboola Yusuf</span>
        <span className="text-gray-600 text-xl font-black">
          Frontend engineer
        </span>
      </div>
    </div>
  );
};

export default HeaderSide;
