export default () => {
  return (
    <footer className="bg-blue-50 py-12 sm:py-16 lg:pt-20 xl:pt-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-7">
          <div className="col-span-2 shrink-0 md:col-span-3">
            <a className="isomorphic-link isomorphic-link--internal" href="/">
              <img className="h-8 w-auto" src="images/logo-full.svg" alt="" />
            </a>
            <p className="text-base font-normal text-gray-900 mt-6">
              Land your next job, while you sleep. Get highly accurate jobs that
              match with your CV. spend less time searching and more time
              applying
            </p>
            {/*     <div className="inline-flex items-center justify-center transition-all duration-150 mt-6 hover:-translate-y-1 hover:shadow-md lg:justify-start">
              <img
                className="h-12 w-auto"
                src="images/top-post-badge.svg"
                alt="ApplyGenius"
              />
            </div> */}
            <div>
              <div className="inline-flex items-center gap-2 text-base font-medium text-blue-600 mt-6 hover:underline">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-8,144H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"></path>
                </svg>
                support@applyBase.net
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 mt-12 sm:mt-16 md:flex-row md:justify-between">
          <p className="text-sm font-medium text-gray-600">
            © ApplyBase 2024 . All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
