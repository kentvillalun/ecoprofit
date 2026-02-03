"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import { BellIcon } from "@heroicons/react/24/outline";
import { CameraIcon } from "@heroicons/react/24/solid"
 
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
          <Image src="/logo-solo.svg" width={32} height={38} alt="Logo" />
          <BellIcon className="w-7.25 h-7.25" />
        </div>
      </header>

      <section className="absolute top-18 max-h-[calc(100dvh-72px)] p-3 flex flex-col gap-6">

        <div className="flex flex-col items-start">
          <p className="font-medium text-[14px]">Hi, Jaymar</p>
          <p className="text-[14px]">Sell your recyclables to Barangay Beddend Laud</p>
        </div>

        <div className="flex items-center justify-center">
          <div className="bg-[#89D957] min-h-45 min-w-45 flex flex-col items-center justify-start gap-1 pt-7 rounded-full border-2 border-white shadow-gray-400 shadow-lg">
            <CameraIcon className="h-21 w-21 fill-white"/>
            <p className="font-medium text-[14px] text-white">Capture Recyclables</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-2 rounded-[10px]">
            <p className="font-medium text-[12px]">Barangay Schedule Today:</p>
            <p className="text-[12px] text-[#727272]">Tue & Thu — 9:00 AM to 4:00 PM</p>
          </div>
          <div className="bg-white p-2 rounded-[10px]">
            <p className="font-medium text-[12px]">Current Buying Prices:</p>
            <p className="text-[12px] text-[#727272]">PET: ₱8/kg</p>
            <p className="text-[12px] text-[#727272]">Cardboard: ₱5/kg</p>
          </div>
        </div>

        <div className="">
          <p className="font-medium text-[12px]">Recent Requests</p>
          
        </div>
      </section>
    </main>
  );
}
