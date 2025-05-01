import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const NavBar = () => {
  const { user, setShowLogin ,logout, credit } = useContext(AppContext);

  const [showLogout, setShowLogout] = useState(false)

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-4">
      <Link to={"/"} className="flex items-center gap-2">
        <img src={assets.logo1} className="w-6 md:w-7 lg:w-10" alt="Logo" />
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold ">
          Imaginary
        </p>
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-300 "
            >
              <img className="w-5" src={assets.credit_star} alt="" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credit left : {credit}
              </p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4">Hi, {user.name}</p>
            <div className="relative group">
              <img
                onClick={()=>setShowLogout(!showLogout)}
                className="w-10 drop-shadow"
                src={assets.profile_icon}
                alt=""
              />
              <div className={`absolute ${showLogout ? 'block' : 'hidden'} md:hidden group-hover:md:block top-0 right-0 z-10 text-black rounded pt-12`}>
                <ul className="list-none m-0 p-2 bg-white rounded-md border border-gray-300 text-sm">
                  <li onClick={()=>{
                    logout()
                    setShowLogout(false)
                  }} className="px-2 py-1 cursor-pointer pr-10">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p onClick={() => navigate("/buy")} className="cursor-pointer">
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
