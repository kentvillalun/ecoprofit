"use client";

import { Poppins } from "next/font/google";
import {
  PhoneIcon,
  LockClosedIcon,
  MapPinIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { TermsModal } from "@/components/auth/TermsModal";
import { useState } from "react";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function SingupPage() {

  const [isTermsOpen, setIsTermsOpen] = useState(false)

  

  return (
    
    <main
      className={`min-h-screen flex justify-center bg-linear-to-b from-[#FFFFFF] from-10% to-[#89D957] ${poppins.className}`}
    >
      
        {isTermsOpen && (
          <section className="fixed min-h-screen bg-black/30 min-w-screen backdrop-blur-sm flex items-center justify-center">
            <TermsModal setIsTermsOpen={setIsTermsOpen} isTermsOpen={isTermsOpen} />
          </section>
        )}
      <div className="grid">
        <div className="flex justify-end items-end">
          <img
            src="/onboarding/step1.png"
            alt="EcoProfit Logo"
            className="aspect-4/2 object-cover max-w-[]"
          />
        </div>
        <div className="mx-2 mt-2 bg-white py-10 px-10 rounded-t-[20px] flex flex-col gap-8 ">
          <h3 className="font-semibold text-[20px]">Sign Up</h3>
          <div className="flex flex-col gap-4">
            {/* Login form elements go here */}
            <div className=" flex flex-row gap-3.25 border-b border-[#E7E3E0] p-2.5">
              <PhoneIcon className="h-5.75 w-5.75 stroke-[#4C5F66]" />
              <input
                type="text"
                placeholder="Phone number"
                className="outline-none"
              />
            </div>

            <div className="flex flex-row gap-3.25 border-b border-[#E7E3E0] p-2.5">
              <MapPinIcon className="h-5.75 w-5.75 stroke-[#4C5F66]" />
              <input
                type="text"
                placeholder="Address/ Purok"
                className="outline-none"
              />
            </div>

            <div className="flex flex-row gap-3.25 border-b border-[#E7E3E0] p-2.5">
              <BuildingOffice2Icon className="h-5.75 w-5.75 stroke-[#4C5F66]" />
              <input
                type="text"
                placeholder="Barangay"
                className="outline-none"
              />
            </div>

            <div className="flex flex-row gap-3.25 border-b border-[#E7E3E0] p-2.5">
              <LockClosedIcon className="h-5.75 w-5.75 stroke-[#4C5F66]" />
              <input
                type="text"
                placeholder="Password"
                className="outline-none"
              />
            </div>

            <div className="flex flex-row gap-3.25 border-b border-[#E7E3E0] p-2.5">
              <LockClosedIcon className="h-5.75 w-5.75 stroke-[#4C5F66]" />
              <input
                type="text"
                placeholder="Confirm Password"
                className="outline-none"
              />
            </div>

            <div className="ml-1 flex flex-row gap-3.25 p-2.25 justify-start items-center">
              <input type="checkbox" name="eula" className="h-4.25 w-4.25 "/>
              
              <p htmlFor="eula" className="px-1 text-[13px] text-[#4C5F66]" onClick={() => {
                setIsTermsOpen(true)
              }} >
                I accept <span className="font-medium text-black">Terms & conditions</span>{" "}
                and <span className="font-medium text-black">Privacy policy.</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 justify-center items-center">
            <button className="bg-primary text-white font-medium py-3.75 px-20 rounded-[40px] max-w-63.75">
              Sign Up
            </button>

            <Link className="text-[14px] text-center text-[#4C5F66]" href="/login">
              Already have an account? <span className="font-medium text-black">Log In</span>
            </Link>
          </div>
        </div>
      </div>
    </main> 
  );
}
