import React from "react";
import { PiFilmSlateFill } from "react-icons/pi";
import Logo from "../logo/Logo";

const Footer = () => {
  return (
    <footer className="footer pt-25 pb-10 bg-neutral text-neutral-content relative  overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-gray-400 via-blue-600 to-teal-600 opacity-20 animate-pulse pointer-events-none"></div>
    <Logo></Logo>
      <div className="relative z-10 grid grid-cols-1 justify-center md:ml-52 sm:grid-cols-4 gap-36">



        <nav className="space-y-2">
          <h6 className="footer-title text-lg font-bold">Quick Links</h6>
          <div className="flex flex-col gap-2">
            <a className="link link-hover transition-colors duration-300 hover:text-orange-400">About us</a>
            <a className="link link-hover transition-colors duration-300 hover:text-orange-400">Contact</a>
            <a className="link link-hover transition-colors duration-300 hover:text-orange-400">Jobs</a>

          </div>
        </nav>

        <nav className="space-y-2">
          <h6 className="footer-title text-lg font-bold">Privacy</h6>
          <div className="flex flex-col gap-2">
            <a className="link link-hover transition-colors duration-300 hover:text-orange-400">Terms of use</a>
            <a className="link link-hover transition-colors duration-300 hover:text-orange-400">Privacy policy</a>
            <a className="link link-hover transition-colors duration-300 hover:text-orange-400">Cookie policy</a>
          </div>
        </nav>

        <nav>
          <h6 className="footer-title text-orange-600 text-2xl font-bold"> social links</h6>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform  hover:scale-125 transition-transform duration-500 hover:rotate-12"
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 50 50">
                <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-125 transition-transform duration-500 hover:rotate-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current">
                <path
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-125 transition-transform duration-500 hover:rotate-12">
              <svg

                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current">
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </div>
      <div className="">

        <p className="ml-[500px] text-center"> @MyCompany. All rights reserved.  {new Date().getFullYear()}</p>
      </div>

    </footer>
  );
};

export default Footer;
