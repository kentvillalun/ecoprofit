"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function BarangayLoginPage() {
  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-[#FFFFFF]  from-24% to-[#89D957] ${poppins.className} `}
    >
      <section className="flex flex-col justify-center ">
        <div className="flex justify-center">
          <img
            src="/onboarding/step1.png"
            alt="EcoProfit Logo"
            className="aspect-4/2 object-cover w-[40%]"
          />
        </div>
        <div className="bg-white py-7.5 px-11.5 rounded-2xl border border-[#00000007] shadow-md flex flex-col gap-10 min-w-171 m-auto">
          <div className="flex flex-col gap-1.75 justify-center items-center">
            <h3 className="text-[20px] font-semibold">Barangay Admin Login</h3>
            <p className="text-[14px] text-[#4C5F66]">
              Sign in to manage recycling operatins
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="" className="text-gray-700">
                Email / Username
              </label>
              <input
                type="email"
                className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors"
                placeholder="Enter your email or username"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="" className="text-gray-700">
                Password
              </label>
              <div className="flex flex-row justify-between outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors">
                <input
                  type="password"
                  className="outline-none max-w-full min-w-[70%] "
                  placeholder="Enter your password"
                />
                <button className="hover:cursor-pointer">Show</button>
              </div>
            </div>
          </div>

          <div className="w-full">
            <button className="bg-primary text-white font-medium py-3.75 px-24 rounded-[40px] w-full">
              Sign in
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
