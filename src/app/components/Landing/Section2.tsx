export default () => {
  return (
    <section>
      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="relative z-10 mx-auto px-5 sm:px-8 lg:max-w-5xl lg:px-12 xl:px-0">
            <div className="overflow-hidden shadow-md ring-1 ring-gray-200 rounded-2xl">
              <img
                className="w-full object-cover"
                src="images/dashboard-mockup.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="relative flex items-end justify-center overflow-hidden -mt-32 rounded-2xl px-16 pb-12 pt-32 sm:-mt-48 sm:rounded-3xl sm:pb-16 sm:pt-48 md:-mt-64 md:pt-64 lg:-mt-96 lg:pt-96 xl:rounded-[32px]">
            <div className="absolute -bottom-16 -right-16">
              <div className="size-[400px] bg-[#B2CCFF] opacity-50 blur-[500px] rounded-full sm:size-[500px] lg:size-[600px]"></div>
            </div>
            <div className="absolute -bottom-16 -left-16">
              <div className="size-[400px] bg-[#BAE6FD] opacity-50 blur-[500px] rounded-full sm:size-[500px] lg:size-[600px]"></div>
            </div>
            <div className="max-w-5xl mx-auto mt-16 text-center lg:mt-20">
              <p className="text-base font-semibold text-gray-900">
                1.2 million+ Jobs from top organizations all over the world
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 mt-4 sm:mt-6 lg:gap-x-8">
                <img
                  className="w-24 object-contain mix-blend-multiply sm:h-14"
                  src="/logos/spotify.svg"
                  alt=""
                />
                <img
                  className="w-24 object-contain mix-blend-multiply sm:h-14"
                  src="/logos/slack.svg"
                  alt=""
                />
                <img
                  className="w-24 object-contain mix-blend-multiply sm:h-14"
                  src="/logos/british.png"
                  alt=""
                />
                <img
                  className="w-24 object-contain mix-blend-multiply sm:h-14"
                  src="/logos/openai.svg"
                  alt=""
                />
                <img
                  className="w-24 object-contain mix-blend-multiply sm:h-14"
                  src="/logos/revolut.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
