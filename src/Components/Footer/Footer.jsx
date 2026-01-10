import React from "react";
import Logo from "../logo/Logo";
import { FaXTwitter } from "react-icons/fa6";
import { CiFacebook, CiYoutube } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="footer pt-16 pb-10 bg-dark text-neutral-content relative overflow-hidden">
   
   <div className="flex  justify-center md:justify-start ml-32 md:ml-80 ">
            <Logo />
          </div>
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center">
        {/* Top Section: Logo and Links */}
           {/* Logo Column */}
       
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 ">
          
       

          {/* Quick Links */}
          <nav className="flex flex-col items-center md:items-start space-y-2">
            <h6 className="footer-title text-secondary text-lg font-bold">Quick Links</h6>
            <div className="flex flex-col items-center md:items-start gap-2">
              <a href="/about" className="link link-hover transition-colors duration-300 hover:text-orange-400">About us</a>
              <a href="/contact" className="link link-hover transition-colors duration-300 hover:text-orange-400">Contact</a>
              <a href="/services" className="link link-hover transition-colors duration-300 hover:text-orange-400">Services</a>
            </div>
          </nav>

          {/* Privacy Column */}
          <nav className="flex flex-col items-center md:items-start space-y-2">
            <h6 className="footer-title text-secondary text-lg font-bold">Privacy</h6>
            <div className="flex flex-col items-center md:items-start gap-2">
              <a href="/blogs" className="link link-hover transition-colors duration-300 hover:text-orange-400">Blog</a>
              <a href="/privacy-policy" className="link link-hover transition-colors duration-300 hover:text-orange-400">Privacy policy</a>
              <a href="/cookies" className="link link-hover transition-colors duration-300 hover:text-orange-400">Cookie policy</a>
            </div>
          </nav>

          {/* Social Links Column */}
          <nav className="flex flex-col items-center md:items-start space-y-4">
            <h6 className="footer-title text-lg text-secondary font-bold uppercase">Social Links</h6>
            <div className="flex gap-6 text-3xl">
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="transform hover:scale-125 transition-transform duration-500 hover:rotate-12">
                <FaXTwitter />
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="transform hover:scale-125 transition-transform duration-500 hover:rotate-12">
                <CiYoutube />
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="transform hover:scale-125 transition-transform duration-500 hover:rotate-12">
                <CiFacebook />
              </a>
            </div>
          </nav>
        </div>

      </div>
      
        {/* Bottom Section: Copyright */}
        <div className="mt-16 pt-8 ">
          <p className="text-center md:ml-[500px] text-sm opacity-80">
            &copy; {new Date().getFullYear()} MOVIEMASTER. All rights reserved.
          </p>
        </div>
    </footer>
  );
};

export default Footer;