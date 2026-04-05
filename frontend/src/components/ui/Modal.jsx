"use client";

import { Poppins } from "next/font/google";
import {
  XCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Pill } from "./Pill";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const Modal = ({ isOpen, onClose, children, className = "" }) => {
  return (
    // blur background
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        className={`fixed flex flex-col justify-center  z-100 bg-white  rounded-2xl m-4 min-w-[90%] md:min-w-[45%] ${poppins.className} max-h-[90%]`}
      >
        <div className="p-6 border-b border-gray-200 w-full">
          <div className="sticky flex flex-row items-center justify-between ">
            <div className="flex flex-row gap-4">
              <div className="border p-3 border-gray-200 rounded-lg flex items-center">
                <ExclamationTriangleIcon className="w-6 stroke-black" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-4 items-center">
                  <h4 className="font-semibold text-[16px]">Decline Request</h4>
                  <Pill type={"REQUESTED"} />
                </div>
                <p className="text-gray-600 text-[14px]">
                  Please state the reason for declining request
                </p>
              </div>
            </div>
            <div className="hover:cursor-pointer">
              <XCircleIcon className="w-8 stroke-gray-500" />
            </div>
          </div>
        </div>

        <form className="p-6 flex flex-col gap-5">
          {/* Fields */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold">Rejection Reason</label>
            <textarea type="text" className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors" rows={4} placeholder="Input the reason here"/>
          </div>

          {/* buttons */}
        </form>
        <div className="grid grid-cols-2 text-md font-semibold gap-3 p-6 border-t border-gray-200">
            <button className="py-2.5 border border-gray-300 rounded-lg text-gray-700">Cancel</button>
            <button className="py-2.5 bg-red-500  text-white rounded-lg">Decline</button>
          </div>
      </div>
    </section>
  );
};
