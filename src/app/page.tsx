"use client";

import React, { useEffect, useRef, useState } from "react";
import Hero from "./components/Landing/Hero";
import Section2 from "./components/Landing/Section2";
import Section3 from "./components/Landing/Section3";
import Section4 from "./components/Landing/Section4";
import Section5 from "./components/Landing/Section5";
import Section6 from "./components/Landing/Section6";
import Section7 from "./components/Landing/Section7";
import Footer from "./components/Landing/Footer";

export default function Home() {
  const [isJuvostreams, setIsJuvoStreams] = useState(false);

  useEffect(() => {
    if (window.location.hostname === 'juvostreams.com.ng') {
      setIsJuvoStreams(true);
    }
  }, []);

  return (
    <div className="h-full bg-white font-sans text-gray-900 antialiased">
      <div
        style={{
          position: "fixed",
          zIndex: 9999,
          top: "16px",
          left: "16px",
          right: "16px",
          bottom: "16px",
          pointerEvents: "none",
        }}
      ></div>
      <div className="isolate flex min-h-screen flex-col">
        <header className="sticky z-50 bg-white/90 backdrop-blur-lg inset-x-0 top-0 border-b border-gray-100 py-3">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="shrink-0">
                <a
                  className="isomorphic-link isomorphic-link--internal flex items-center gap-x-3"
                  href="/"
                >
                  <img className="h-7 w-auto"
                    src={isJuvostreams ? "/logo-juvostreams.png" : "/logo.png"}
                    alt=""
                  />
                  <span className="text-2xl font-black"> {isJuvostreams ? 'JuvoStreams' : 'Bubbble'}</span>
                </a>
              </div>
              {/* <div className="hidden items-center justify-center gap-4 lg:flex">
              <a
                className="isomorphic-link isomorphic-link--internal text-sm font-semibold leading-5 transition-all duration-150 rounded-lg px-2 py-1.5 text-gray-950 hover:bg-gray-100 hover:text-blue-600"
                href="/features"
              >
                Features
              </a>
              <a
                className="isomorphic-link isomorphic-link--internal text-sm font-semibold leading-5 transition-all duration-150 rounded-lg px-2 py-1.5 text-gray-950 hover:bg-gray-100 hover:text-blue-600"
                href="/integrations"
              >
                Integrations
              </a>
              <a
                className="isomorphic-link isomorphic-link--internal text-sm font-semibold leading-5 transition-all duration-150 rounded-lg px-2 py-1.5 text-gray-950 hover:bg-gray-100 hover:text-blue-600"
                href="/pricing"
              >
                Pricing
              </a>
              <a
                className="isomorphic-link isomorphic-link--internal text-sm font-semibold leading-5 transition-all duration-150 rounded-lg px-2 py-1.5 text-gray-950 hover:bg-gray-100 hover:text-blue-600"
                href="/demo"
              >
                Live Demo
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="/blog"
                className="isomorphic-link isomorphic-link--external text-sm font-semibold leading-5 text-gray-950 transition-all duration-150 rounded-lg px-2 py-1.5 hover:bg-gray-100 hover:text-blue-600"
              >
                Blog
              </a>
            </div> */}
              <div className="flex items-center justify-end gap-4">
                <a
                  href="/login"
                  className="inline-flex items-center justify-center bg-blue-600 text-sm font-semibold leading-5 text-white shadow-sm transition-all duration-150 rounded-lg px-3 py-1.5 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Login{" "}
                  <span className="hidden lg:inline-block pl-2">
                    {" "}
                    to your account{" "}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </header>

        <main>
          <Hero />
        </main>
      </div>
    </div>
  );
}
