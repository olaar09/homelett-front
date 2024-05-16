import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-white py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover opacity-30"
          src="images/background-pattern.svg"
          alt=""
        />
      </div>
      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center lg:max-w-3xl">
          <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl xl:text-7xl">
            Your AI Copilot For Job Search
          </h1>
          <p className="max-w-2xl text-base font-normal text-gray-600 mx-auto mt-3 sm:text-xl sm:mt-5 lg:text-2xl">
            Spend less time searching and more time applying. Bubble uses AI to
            match you with high-success potential jobs based on your profile and
            align your CV with each job
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 text-sm font-medium text-gray-900 mt-6 sm:mt-8">
            <li className="inline-flex items-center gap-2">
              <svg
                aria-hidden="true"
                className="size-6 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d="M224,127.17a96.48,96.48,0,0,1-2.39,22.18A24,24,0,0,1,198.21,168H152a24,24,0,0,0-24,24,24,24,0,0,1-32,22.61C58.73,201.44,32,169.81,32,128a96,96,0,0,1,95-96C179.84,31.47,223.55,74.35,224,127.17Z"
                  opacity="0.2"
                ></path>
                <path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89Zm13,93.71A15.89,15.89,0,0,1,198.21,160H152a32,32,0,0,0-32,32,16,16,0,0,1-21.31,15.07C62.49,194.3,40,164,40,128a88,88,0,0,1,87.09-88h.9a88.35,88.35,0,0,1,88,87.25A88.86,88.86,0,0,1,213.81,147.6ZM140,76a12,12,0,1,1-12-12A12,12,0,0,1,140,76ZM96,100A12,12,0,1,1,84,88,12,12,0,0,1,96,100Zm0,56a12,12,0,1,1-12-12A12,12,0,0,1,96,156Zm88-56a12,12,0,1,1-12-12A12,12,0,0,1,184,100Z"></path>
              </svg>
              50+ Jobs daily
            </li>
            <li className="inline-flex items-center gap-2">
              <svg
                aria-hidden="true"
                className="size-6 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d="M128,129.09V232a8,8,0,0,1-3.84-1l-88-48.16a8,8,0,0,1-4.16-7V80.2a8,8,0,0,1,.7-3.27Z"
                  opacity="0.2"
                ></path>
                <path d="M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z"></path>
              </svg>
              AI Job Match
            </li>
            <li className="inline-flex items-center gap-2">
              <svg
                aria-hidden="true"
                className="size-6 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z"
                  opacity="0.2"
                ></path>
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm87.63,96H175.8c-1.41-28.46-10.27-55.47-25.12-77A88.2,88.2,0,0,1,215.63,120ZM96.23,136h63.54c-1.68,30.87-13,59.62-31.77,79.89C109.27,195.62,97.91,166.87,96.23,136Zm0-16c1.68-30.87,13-59.62,31.77-79.89,18.73,20.27,30.09,49,31.77,79.89Zm9.09-77C90.47,64.53,81.61,91.54,80.2,120H40.37A88.2,88.2,0,0,1,105.32,43ZM40.37,136H80.2c1.41,28.46,10.27,55.47,25.12,77A88.2,88.2,0,0,1,40.37,136Zm110.31,77c14.85-21.56,23.71-48.57,25.12-77h39.83A88.2,88.2,0,0,1,150.68,213Z"></path>
              </svg>
              Remote Jobs
            </li>
            <li className="inline-flex items-center gap-2">
              <svg
                aria-hidden="true"
                className="size-6 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z"
                  opacity="0.2"
                ></path>
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-68a28,28,0,0,1-28,28h-4v8a8,8,0,0,1-16,0v-8H104a8,8,0,0,1,0-16h36a12,12,0,0,0,0-24H116a28,28,0,0,1,0-56h4V72a8,8,0,0,1,16,0v8h16a8,8,0,0,1,0,16H116a12,12,0,0,0,0,24h24A28,28,0,0,1,168,148Z"></path>
              </svg>
              Affordable Pricing
            </li>
          </ul>
          <div className="mt-6 sm:mt-8">
            <a
              href="/request-invite"
              className="inline-flex items-center justify-center bg-blue-600 text-lg font-semibold text-white shadow-sm transition-all duration-150 rounded-xl px-8 py-4 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Request access
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
