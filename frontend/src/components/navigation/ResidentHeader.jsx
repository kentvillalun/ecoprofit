"use client";

import { ArrowLeftIcon, BellIcon } from "@heroicons/react/24/outline";
import { Poppins } from "next/font/google";
import { useState } from "react";
import Link from "next/link"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ResidentHeader = ({ title, subtitle, notification }) => {

  const [isNotification, setIsNotification] = useState(notification)
  
  return (
    <header
      className={`flex flex-row items-start justify-between min-w-full max-h-24 bg-white fixed top-0 py-5 px-8 ${poppins.className} shadow-lg`}
    >
      <div className="flex flex-row items-center justify-between min-w-full">
        <ArrowLeftIcon
          className="h-6 text-[#727272]"
          onClick={() => history.back()}
        />
        <div className="flex flex-col items-center">
          <p className="font-semibold text-lg text-nowrap">{title}</p>
          <p className="text-sm font-medium text-nowrap">{subtitle}</p>
        </div>
        {isNotification ? (
          <Link href={"/announcements"}>
            <BellIcon className="w-7.25 h-7.25" />
          </Link>
        ) : (
          <div className="w-6"></div>
        )}
      </div>
    </header>
  );
};
