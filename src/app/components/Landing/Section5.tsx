export default () => {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center lg:max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Built by techies, for techies
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 mt-4 sm:text-4xl lg:text-5xl">
            Who can join?
          </h2>
          <p className="text-base text-gray-700 mt-4 sm:text-lg">
            ApplyBase can be used by anyone to apply for jobs, however, our AI
            is currently only fine tuned for tech based job applications
          </p>
        </div>
        <div className="grid max-w-md grid-cols-1 gap-y-8 mx-auto mt-12 text-center sm:mt-16 md:max-w-none md:grid-cols-3 md:gap-x-12 md:mx-0 md:text-left">
          <div>
            <img
              className="mx-auto md:mx-0"
              src="images/web-studio-illustration.svg"
              alt=""
            />
            <h3 className="text-lg font-semibold text-gray-900 mt-2 sm:text-xl">
              Software engineers and devOps
            </h3>
            <p className="text-base/7 font-normal text-gray-600 mt-2">
              Cover letter and job experience are written to depict deep
              knowledge and skill of the required tech stack for the job
            </p>
          </div>
          <div>
            <img
              className="mx-auto md:mx-0"
              src="images/marketing-agency-illustration.svg"
              alt=""
            />
            <h3 className="text-lg font-semibold text-gray-900 mt-2 sm:text-xl">
              UI / UX and Product
            </h3>
            <p className="text-base/7 font-normal text-gray-600 mt-2">
              Correct industry terminologies are utilized, giving hiring
              managers a energetic sense of professionalism about the applicant
            </p>
          </div>
          <div>
            <img
              className="mx-auto md:mx-0"
              src="images/solution-provider-illustration.svg"
              alt=""
            />
            <h3 className="text-lg font-semibold text-gray-900 mt-2 sm:text-xl">
              Data analysts & Cyber sec
            </h3>
            <p className="text-base/7 font-normal text-gray-600 mt-2">
              Correct industry terminologies are utilized, giving hiring
              managers a energetic sense of professionalism about the applicant
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
