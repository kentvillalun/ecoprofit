"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  return (
    <main className={`min-h-screen flex items-center justify-center bg-linear-to-b from-[#FFFFFF]  from-24% to-[#89D957] ${poppins.className}`}>
      {step === 1 && (
        <>
          <div className="flex flex-col items-center w-full max-w-md gap-25 p-2 justify-center">
            <div className="">
              <img
                src="../onboarding/step1.png"
                alt="step 1"
              />
            </div>
            <div className="">
              <button
                className="bg-primary min-w-63.75 min-h-13.5 rounded-[40px] font-poppins text-white font-medium text-base"
                onClick={() => {
                  setStep(step + 1);
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="flex flex-col justify-between h-screen w-full max-w-md p-4 pt-12 pb-10 ">
            <div className="flex flex-col items-center w-full max-w-md p-2 justify-center ">
              <img src="../onboarding/step2.png" alt="step 1" className="" />
              <h3 className="text-[22px] max-w-88.75 text-center mb-6.25 font-medium">
                Too Much Waste, Not Enough Proper Segregation
              </h3>
              <p className="text-[14px] text-center">
                Households want to recycle, but barangays struggle to organize
                collection and track recyclables properly.
              </p>
            </div>
            <div className="">
              <div className="flex justify-between p-6 text-[14px]">
                <Link className="font-medium" href="/login" >Skip</Link>
                <button className="font-medium" onClick={() => {
                  setStep(step + 1);
                }}>Next</button>
              </div>
              <div className="flex justify-center gap-3">
                <div className="h-2.5 w-2.5 bg-black rounded-full"></div>
                <div className="h-2.5 w-2.5 bg-[#48484856] rounded-full"></div>
                <div className="h-2.5 w-2.5 bg-[#48484856] rounded-full"></div>
              </div>
            </div>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="flex flex-col justify-between h-screen w-full max-w-md p-4 pt-12 pb-10 font-poppins">
            <div className="flex flex-col items-center w-full max-w-md p-2 justify-center ">
              <img src="../onboarding/step3.png" alt="step 1" className="" />
              <h3 className="font-medium text-[22px] max-w-86 text-center mb-6.25">
                EcoProfit Makes Community Recycling Simple
              </h3>
              <p className="text-[14px] text-center">
                Sell your recyclables directly to the barangay. Barangay collects, weighs, pays, and tracks everything transparently.
              </p>
            </div>
            <div className="">
              <div className="flex justify-between p-6 text-[14px]">
                <Link className="font-medium" href="/login" >Skip</Link>
                <button className="font-medium" onClick={() => {
                  setStep(step + 1);
                }}>Next</button>
              </div>
              <div className="flex justify-center gap-3">
                <div className="h-2.5 w-2.5 bg-[#48484856]  rounded-full"></div>
                <div className="h-2.5 w-2.5 bg-black rounded-full"></div>
                <div className="h-2.5 w-2.5 bg-[#48484856] rounded-full"></div>
              </div>
            </div>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <div className="flex flex-col justify-between h-screen w-full max-w-md p-4 pt-12 pb-10 font-poppins">
            <div className="flex flex-col items-center w-full max-w-md p-2 justify-center ">
              <img src="../onboarding/step4.png" alt="step 1" className="" />
              <h3 className="font-poppins font-medium text-[22px] max-w-86 text-center mb-6.25">
                How EcoProfit Works
              </h3>
              <p className="text-[14px] text-center">
                Snap a photo of your recyclables, wait for barangay approval, get weighed and paid during pickup, and support a cleaner, more sustainable community.
              </p>
            </div>
            <div className="">
              <div className="flex justify-between p-6 text-[14px]">
                <Link className="font-medium" href="/login" >Skip</Link>
                
                <Link className="font-medium" href="/login" >Next</Link>
              </div>
              <div className="flex justify-center gap-3">
                <div className="h-2.5 w-2.5 bg-[#48484856] rounded-full"></div>
                <div className="h-2.5 w-2.5 bg-[#48484856] rounded-full"></div>
                <div className="h-2.5 w-2.5 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
