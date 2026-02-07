"use client";

import { Poppins } from "next/font/google";
import { PhoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Page } from "@/components/layout/Page";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ForgotPasswordPage() {
  return (
    <Page gradient={true}
      
    >
      <div className="grid">
        <div className="flex justify-end items-end">
          <img
            src="../onboarding/Ecoprofit logo.svg"
            alt="EcoProfit Logo"
            className="aspect-4/2 object-cover "
          />
        </div>
        <div className="mx-2 mt-2 bg-white p-10 rounded-t-[20px] flex flex-col gap-8">
          <h3 className="font-semibold text-[20px]">Forgot Password</h3>
          <div className="flex flex-col gap-6 ">
            {/* Login form elements go here */}
            <div className=" flex flex-row gap-3 border-b border-[#E7E3E0] p-2.5">
              <PhoneIcon className="h-6 w-6 stroke-[#4C5F66]" />
              <input
                type="text"
                placeholder="Phone number"
                className="outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.25 justify-center items-center">
            <button className="bg-primary text-white font-medium py-4 px-24 rounded-[40px] max-w-63.75">
              Submit
            </button>
            <Link
              className="text-[14px] text-center text-[#4C5F66]"
              href="/login"
            >
              
              Back to{" "}
              <span className="font-medium text-black">Log In</span>
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
}
