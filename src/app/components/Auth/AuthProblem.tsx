const AuthProblem = () => {
  return (
    <div className="text-center  px-4 mx-auto w-full lg:w-5/12 mt-8">
      <span className=" text-foreground-secondary text-sm text-center">
        Problems with sign in?
        <a
          href="https://api.whatsapp.com/send?phone=2347018135800&text=I%20want%20to%20start%20a%20subscription"
          className=" text-banner"
        >
          {" "}
          Contact support{" "}
        </a>
      </span>
    </div>
  );
};

export default AuthProblem;
