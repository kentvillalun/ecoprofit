"use client";

import { Poppins } from "next/font/google";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { DrawerContext } from "@/app/(barangay)/layout.jsx";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const BarangayHeader = ({ title }) => {
 
    const { sidebarOpen, setSidebarOpen} = useContext(DrawerContext)
    
  return (
    <>
      <header
        className={`flex flex-row items-center justify-between min-w-full max-h-24 bg-[#74C857] fixed top-0 py-5 px-8 ${poppins.className} shadow-lg text-white md:hidden`}
      >
        <Bars3Icon
          className="w-6 h-6 hover:cursor-pointer"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <h1 className="font-semibold text-lg text-nowrap">{title}</h1>
        <div className="w-6"></div>
      </header>
    </>
  );
};
