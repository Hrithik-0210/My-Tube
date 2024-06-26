import React from "react";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Body = () => {
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);
  // console.log(isMenuOpen);

  return (
    <>
      <Header />
      <div className="flex ">
        {isMenuOpen ? (
          <div className="">
            <SideBar />
          </div>
        ) : (
          <div className="mr-3">
            <SideBar />
          </div>
        )}

        {isMenuOpen ? (
          <div className="w-[92%]  px-2 top-20 left-24 ">
            <Outlet />
          </div>
        ) : (
          <div className="w-[88%] px-2 top-20 left-56 ">
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
};

export default Body;
