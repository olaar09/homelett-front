import { Str } from "@/utils/consts";

const AuthProblem = () => {
  return (
    <div className="text-center  px-4 mx-auto w-full lg:w-5/12 mt-8">
      <span className=" text-foreground-secondary text-sm text-center">
        Problems with sign in?
        <a href={Str.whatsappHelp} className=" text-banner">
          {" "}
          Contact support{" "}
        </a>
      </span>
    </div>
  );
};

export default AuthProblem;
