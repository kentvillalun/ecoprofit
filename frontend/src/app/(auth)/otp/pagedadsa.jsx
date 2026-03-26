"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Page } from "@/components/layout/Page";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function OtpPage() {
  return (
    <Page gradient={true} className="from-10%!">
      <div
        className={`w-full max-w-md min-h-svh flex flex-col justify-between px-1 ${poppins.className}`}
      >
        <div className=""></div>
        <div className=""></div>

        <div className="flex justify-end items-end">
          <img
            src="/onboarding/Ecoprofit logo.svg"
            alt="EcoProfit Logo"
            className="aspect-4/2 object-cover"
          />
        </div>

        <div className="mx-1 mt-2 bg-white p-8 rounded-t-[20px] flex flex-col gap-8 max-w-full">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-[20px]">OTP Validation</h3>
            <p className="text-[#4C5F66] text-[14px]">
              We have sent OTP on your number
            </p>
          </div>

          <div className="flex flex-row justify-center gap-1.75 flex-wrap">
            <input
              type="text"
              className="outline h-10 w-10 outline-[#E7E3E0] rounded-[5px] p-3 text-center"
              maxLength={1}
            />
            <input
              type="text"
              className="outline h-10 w-10 outline-[#E7E3E0] rounded-[5px] p-3 text-center"
              maxLength={1}
            />
            <input
              type="text"
              className="outline h-10 w-10 outline-[#E7E3E0] rounded-[5px] p-3 text-center"
              maxLength={1}
            />
            <input
              type="text"
              className="outline h-10 w-10 outline-[#E7E3E0] rounded-[5px] p-3 text-center"
              maxLength={1}
            />
            <input
              type="text"
              className="outline h-10 w-10 outline-[#E7E3E0] rounded-[5px] p-3 text-center"
              maxLength={1}
            />
            <input
              type="text"
              className="outline h-10 w-10 outline-[#E7E3E0] rounded-[5px] p-3 text-center"
              maxLength={1}
            />
            
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2.5 justify-center items-center">
              <button className="bg-primary text-white font-medium py-3.75 px-24 rounded-[40px] max-w-63.75">
                Continue
              </button>

              <div className="text-center flex flex-col gap-5">
                <Link
                  className="text-[14px] text-center text-[#4C5F66]"
                  href="/signup"
                >
                  Don&apos;t have an account?{" "}
                  <span className="font-medium text-black">Sign Up</span>
                </Link>
              </div>
            </div>
          </div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
        </div>
      </div>
    </Page>
  );
}
