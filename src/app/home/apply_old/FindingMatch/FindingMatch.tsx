import Image from "next/image";

const FindingMatch = () => {
  return (
    <section className=" flex items-center justify-center h-screen overflow-hidden">
      <div className="flex flex-col h-20 justify-center items-center gap-y-6">
        <div className="flex items-center gap-x-3 ">
          {[
            "/sources/linkedin.png",
            "/sources/turing.png",
            "/sources/glassdoor.png",
            "/sources/indeed.png",
          ].map((source) => (
            <Image
              width={200}
              height={200}
              className="w-8"
              src={source}
              alt={""}
            />
          ))}
        </div>
        <span className="block items-center text-center">
          KornAI agent is currently analyzing Jobs that match your profile.{" "}
          <br /> You will receive an email when matching jobs are populated
        </span>
      </div>
    </section>
  );
};

export default FindingMatch;
