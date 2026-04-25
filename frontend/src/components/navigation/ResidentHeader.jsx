"use client";

import { ArrowLeftIcon, BellIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Inter } from "next/font/google";
import { useState } from "react";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ResidentHeader = ({
  title,
  subtitle,
  action,
  setIsEditing,
  className = ""
}) => {
  
  const [actions, setActions] = useState(action);
  


  const actionItem = () => {
    switch (actions) {
      case "notification":
        return (
          <Link href={"/announcements"}>
            <BellIcon className="w-7.25 h-7.25" />
          </Link>
        );
      case 'edit':
        return <PencilIcon className="w-6 h-6 text-[#727272]" onClick={() => setIsEditing(true)}/>

      default: 
       return <div className="w-6"></div> 
    }
  };

  return (
    <header
      className={`flex flex-row items-start justify-between min-w-full bg-white fixed top-0 py-5 px-8 ${inter.className} shadow-lg z-50 min-h-18`}
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
        {actionItem()}
      </div>
    </header>
  );
};
