"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ResidentHeader = ({ title, subtitle }) => {
  return (
    <header
      className={`flex flex-row items-start justify-between min-w-full max-h-18.75 bg-white fixed top-0 py-5 px-8 ${poppins.className} shadow-lg`}
    >
      <div className="flex flex-row items-center justify-between min-w-full">
        <ArrowLeftIcon className="h-6 text-[#727272]" onClick={() => history.back()}/>
        <div className="flex flex-col items-center">
          <p className="font-semibold text-lg text-nowrap">{title}</p>
          <p className="text-sm font-medium text-nowrap">{subtitle}</p>
        </div>
        <div className="w-6"></div>
      </div>
    </header>
  );
};
