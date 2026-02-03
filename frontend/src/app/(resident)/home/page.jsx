"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import { BellIcon } from "@heroicons/react/24/outline";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function HomePage() {
  return (
    <main
      className={`min-h-screen flex justify-center bg-linear-to-b from-[#FFFFFF] from-24% to-[#89D957] ${poppins.className} px-4`}
    >
      <header className="flex flex-row items-start justify-between min-w-full max-h-18.75 bg-white  fixed top-0 p-5 shadow-lg">
        <div className="flex flex-row justify-between min-w-full ">
          <Image src="/logo-solo.svg" width={32} height={38} alt="Logo"/>
          <BellIcon className="w-7.25 h-7.25" /> 
        </div>
      </header>

      <section className="relative top-[calc()]">
        <p className="font-medium">Hi, Jaymar</p>
      </section>
    </main>
  );
}
       