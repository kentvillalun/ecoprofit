"use client";

import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ResidentHeader = ({title}) => {

    return (
        <header className={`flex flex-row items-start justify-between min-w-full max-h-18.75 bg-white fixed top-0 py-5 px-8 ${poppins.className}`}>
        <div className="grid grid-cols-3">
          <ArrowLeftIcon className='h-6 text-[#727272]'/>
          <p className="font-semibold text-lg text-nowrap">{title}</p>
          <div className=""></div>
        </div>
      </header>
    )
}