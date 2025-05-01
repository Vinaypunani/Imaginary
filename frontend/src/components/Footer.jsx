import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-20">
      <Link to={"/"} className="flex items-center gap-2">
        <img src={assets.logo1} className="w-6 md:w-7 lg:w-10" alt="Logo" />
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold ">
          Imaginary
        </p>
      </Link>

      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-md:hidden">All right reserved. Copyright @imaginary</p>

      <div className="flex items-center gap-2.5">
        <img src={assets.facebook_icon} alt="" width={35}/>
        <img src={assets.twitter_icon} alt="" width={35}/>
        <img src={assets.instagram_icon} alt="" width={35}/>
      </div>
    </div>
  );
};

export default Footer;
