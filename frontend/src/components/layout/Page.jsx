"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";
import { Sidebar } from "../navigation/Sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const Page = ({ children, className = "", gradient }) => {
  const [isGradient, setIsGradient] = useState(gradient);

  return (
    <>
      <main
        className={`relative min-h-screen flex justify-center ${isGradient ? "bg-linear-to-b from-[#FFFFFF] from-24% to-[#89D957]" : ""} ${poppins.className} ${className}`}
      >
        {children}
      </main>
      
    </>
  );
};
