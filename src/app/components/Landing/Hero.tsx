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
          <h1 className="lg:text-5xl text-4xl md:text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl xl:text-7xl">
            Enjoy premium subscriptions for less
          </h1>
          <p className="max-w-2xl text-base font-normal text-gray-600 mx-auto mt-10 sm:text-xl sm:mt-5 lg:text-2xl">
            Get Netflix, Spotify, YouTube premium, showmax, Prime, Hulu, & HBO
            starting at <b>250 Naira</b>. Enjoy unbeatable prices for your
            subscription services
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 text-sm font-medium text-gray-900 mt-16 sm:mt-8">
            <li className="inline-flex items-center gap-2">
              <img className="w-8" src="/logos/yt.png" />
              No ads
            </li>
            <li className="inline-flex items-center gap-2">
              <img className="w-8" src="/logos/sp.png" />
              Music
            </li>
            <li className="inline-flex items-center gap-2">
              <img className="w-8" src="/logos/pr.jpeg" />
              Movies
            </li>
            <li className="inline-flex items-center gap-2">
              <img className="w-8" src="/logos/nt.png" />
              Netflix movies
            </li>
          </ul>
          <Link href={"/request-invite"}>
            <div className="mt-6 sm:mt-8 w-full">
              <span className="inline-flex items-center justify-center bg-blue-600 text-lg font-semibold text-white shadow-sm transition-all duration-150 rounded-xl px-8 py-3 lg:w-4/12 w-full hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Get started
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
