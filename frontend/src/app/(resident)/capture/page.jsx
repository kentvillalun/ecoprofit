"use client";

import { ResidentHeader } from "@/components/navigation/ResidentHeader";
import { CameraIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function CapturePage() {
  const [isCaptured, setIsCaptured] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isSumbit, setIsSubmit] = useState(false);

  return (
    <main className={`${poppins.className}`}>
      <ResidentHeader title={"Capture Recyclables"} />

      {isSumbit && (
        <section className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-100">
          <div className="bg-white shadow-lg p-4 rounded-lg flex flex-col gap-4">
            <div className="flex items-center justify-end" onClick={() => setIsSubmit(false)}>
              <XCircleIcon className="h-7.5 stroke-gray-400"/>
            </div>
            <div className="flex flex-col items-center justify-center pb-6">
              <CheckCircleIcon className="fill-[#74C857] h-10 w-10" />
              <p className="text-md font-medium">Request Sent!</p>
              <p className="text-sm text-[#727272] max-w-55 text-center">
                Your barangay will review your collection soon.
              </p>
            </div>
          </div>
        </section>
      )}
      <section className="absolute left-0 right-0 top-18 h-[calc(100dvh-72px)] p-3 flex flex-col gap-6 overflow-y-auto pb-[calc(120px+env(safe-area-inset-bottom))]">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center px-6 py-8 border-6 border-dashed rounded-2xl border-gray-200 text-center">
            <CameraIcon className="h-25 fill-gray-200" />
            <p className="font-medium text-gray-500 text-lg">
              Capture your recyclables
            </p>
            <p className="text-gray-400">
              Use your camera to take a photo for verification
            </p>
          </div>
          {isCaptured ? (
            <div className="flex flex-row gap-4">
              <button className=" text-[#727272] p-3 rounded-lg text-sm shadow-md min-w-27">
                Retake
              </button>
              <button
                className="bg-[#74C857] text-white p-3 rounded-lg text-sm shadow-md min-w-27"
                onClick={() => setIsReady(true)}
              >
                Next
              </button>
            </div>
          ) : (
            <button
              className="bg-[#74C857] text-white p-3 rounded-lg text-sm shadow-md min-w-27"
              onClick={() => setIsCaptured(true)}
            >
              Open Camera
            </button>
          )}
        </div>

        {isReady && (
          <div className="flex flex-col gap-8 ">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-sm text-[#727272] px-2">
                  Type of material
                </label>
                <input
                  type="text"
                  className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors"
                  placeholder="e.g. Plastics"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-sm text-[#727272] px-2">
                  Estimated weight
                </label>
                <input
                  type="text"
                  className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors"
                  placeholder="e.g. 1kg "
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-sm text-[#727272] px-2">
                  Purok / Sitio
                </label>
                <input
                  type="text"
                  className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors"
                  placeholder="e.g. Sitio 1 "
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-sm text-[#727272] px-2">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors"
                  placeholder="Enter your notes here "
                />
              </div>
            </div>

            <button className="bg-[#74C857] text-white py-2.5 rounded-lg" onClick={() => setIsSubmit(true)}>
              Submit Request
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
