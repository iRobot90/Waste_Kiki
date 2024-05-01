import React, { useState, useEffect } from 'react'
import logo from '../../assets/images/logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { useUserAuth } from "../../context/UserAuthContext";

export default function NavBar() {
  const [extend, setExtend] = useState(false);
  const { user } = useUserAuth();
  const location = useLocation();

  const navigationLinks = [
    { path: "/", label: "Home", citizen: true, collector: true },
    { path: "/citizens", label: "Home", citizen: true },
    { path: "/collector", label: "Home", collector: true },
    { path: "/pickup", label: "Pickup Request", citizen: true },
    { path: "/schedule", label: "Scheduled Pickup", collector: true },
    { path: "/map", label: "Map", collector: true },
    { path: "/history", label: "Pickup History", citizen: true },
    { path: "/profile", label: "Profile", citizen: true, collector: true },
  ];

  const isActive = (path) => {
    return location.pathname === path;

import React, { useState } from "react"; // Add this import
import logo from "../../assets/images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

export default function HomeNavbar() {
  const [extend, setExtend] = useState(false); // Initialize state for extending menu
  const { user } = useUserAuth();

  const handleButtonClick = () => {
    console.log("Button clicked"); // Add logging for button click event
    setExtend((curr) => !curr);
  };

  return (
    <>
      <div className="bg-slate-100 h-12 flex p-10 justify-between text-teal-900">
        <div className="flex items-center">
          <Link to="/">
            <img className="w-20" src={logo} alt="" />
          </Link>
         <p className='font-bold text-2xl ml-8 text-teal-900'>Waste-Setu</p>
         <nav className="hidden md:block  items-center ml-6">
           {navigationLinks.map((item) => (
             user && (item.citizen === user.isCitizen || item.collector === !user.isCitizen) && (
               <Link
                 key={item.path}
                 className={`m-4 hover:cursor-pointer hover:underline ${isActive(item.path) ? 'active' : ''}`}
                 to={item.path}
               >
                 {item.label}
               </Link>
             )
           ))}
         </nav>
       </div>
       {console.log("User" , user)}
        {
          user ? (
            <>
            <div className=' flex items-center text-xl text-teal-900  '>
              <Link className="m-4 hover:cursor-pointer hover:underline" href="/profile">{user.displayName}</Link>
            </div>
            </>
          ): (
            <div className=' flex items-center text-xl text-teal-900  '>
                <Link className='border-4 px-4 py-2 text-teal-900 hover:text-white border-teal-900 hover:bg-teal-900 hidden sm:block m-2' to="/login">Login</Link>
                <Link className='border-4 px-4 py-2 text-teal-900 hover:text-white border-teal-900 hover:bg-teal-900 hidden sm:block m-2' to="/cards">SignUp</Link> 
                <button onClick={()=>{setExtend((curr)=>(!curr))}} className='block md:hidden text-teal-900 m-2' ><MenuIcon/></button>
            </div>
          )
        }
    </div>
    <div className={`text-center ${extend?"block":"hidden"} md:hidden bg-slate-100 text-teal-900 `}>
      <ul>
        {navigationLinks.map((item) => (
          user && (item.citizen === user.isCitizen || item.collector === !user.isCitizen) && (
            <li key={item.path} className="mt-3">
              <Link to={item.path} className={`hover:cursor-pointer hover:underline ${isActive(item.path) ? 'active' : ''}`}>
                {item.label}
              </Link>
            </li>
          )
        ))}
      </ul>
    </div>

          <p className="font-bold text-2xl ml-8 text-teal-900">Waste-Kiki</p>
          {user && user.isCitizen ? (
            <nav className="hidden md:block items-center ml-6">
              <Link
                className="m-4 hover:cursor-pointer hover:underline"
                to="/citizens"
              >
                Home
              </Link>
              <Link
                className="m-4 hover:cursor-pointer hover:underline"
                to="/pickup"
              >
                Pickup-Request
              </Link>
              <Link
                className="m-4 hover:cursor-pointer hover:underline"
                to="/history"
              >
                Pickup-History
              </Link>
            </nav>
          ) : user ? (
            <nav className="hidden md:block items-center ml-6">
              <Link
                className="m-4 hover:cursor-pointer hover:underline"
                to="/collector"
              >
                Home
              </Link>
              <Link
                className="m-4 hover:cursor-pointer hover:underline"
                to="/schedule"
              >
                Scheduled Pickup
              </Link>
              <Link
                className="m-4 hover:cursor-pointer hover:underline"
                to="/map"
              >
                Map
              </Link>
            </nav>
          ) : (
            ""
          )}
        </div>
        {user ? (
          <div className="flex items-center text-xl text-teal-900">
            <Link
              className="m-4 hover:cursor-pointer hover:underline"
              to="/profile"
            >
              {user.displayName}
            </Link>
          </div>
        ) : (
          <div className="flex items-center text-xl text-teal-900">
            <Link
              className="border-4 px-4 py-2 text-teal-900 hover:text-white border-teal-900 hover:bg-teal-900 hidden sm:block m-2"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="border-4 px-4 py-2 text-teal-900 hover:text-white border-teal-900 hover:bg-teal-900 hidden sm:block m-2"
              to="/cards"
            >
              SignUp
            </Link>
            <button
              onClick={handleButtonClick} // Corrected usage of click handler
              className="block md:hidden text-teal-900 m-2"
            >
              <MenuIcon />
            </button>
          </div>
        )}
      </div>
      <div
        className={`text-center ${
          extend ? "block" : "hidden"
        } md:hidden bg-slate-100 text-teal-900`}
      >
        <ul>
          {user && user.isCitizen ? (
            <>
              <li className="mt-3">
                <Link to="/citizens">Home</Link>
              </li>
              <li className="mt-3">
                <Link to="/pickup">Pickup-Request</Link>
              </li>
              <li className="mt-3">
                <Link to="/history">Pickup-History</Link>
              </li>
            </>
          ) : user ? (
            <>
              <li className="mt-3">
                <Link to="/collector">Home</Link>
              </li>
              <li className="mt-3">
                <Link to="/schedule">Scheduled Pickup</Link>
              </li>
              <li className="mt-3">
                <Link to="/map">Map</Link>
              </li>
            </>
          ) : (
            ""
          )}
          {user ? (
            <li className="mt-3 block sm:hidden">
              <Link to="/profile">Profile</Link>
            </li>
          ) : (
            <>
              <li className="mt-3 block sm:hidden">
                <Link to="/login">Login</Link>
              </li>
              <li className="mt-3 block sm:hidden">
                <Link to="/cards">SignUp</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}
