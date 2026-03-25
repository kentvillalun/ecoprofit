"use client";

import { ResidentHeader } from "@/components/navigation/ResidentHeader";
import { CameraIcon, XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";

export default function CapturePage() {
  const fileInputRef = useRef(null);
  const [capturedImageUrl, setCapturedImageUrl] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const openCamera = () => {
    fileInputRef.current.click();
  };

  const handleImageCapture = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);
    setCapturedImageUrl(url);

    event.target.value = "";
  };

  return (
    <main>
      <ResidentHeader title={"Capture Recyclables"} />

      {isSubmit && (
        <section className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-100" onClick={() => setIsSubmit(false)}>
          <div className="bg-white shadow-lg p-4 rounded-lg flex flex-col gap-4 items-center justify-center">
            <div className="flex flex-col items-center justify-center py-4">
              <CheckCircleIcon className="fill-[#74C857] h-10 w-10" />
              <p className="text-md font-medium">Request Sent!</p>
              <p className="text-sm text-[#727272] max-w-55 text-center">
                Your barangay will review your collection soon.
              </p>
            </div>
          </div>
        </section>
      )}
      <section className="absolute left-0 right-0 top-18 h-[calc(100dvh-72px)] p-3 flex flex-col gap-6 overflow-y-auto pb-[calc(120px+env(safe-area-inset-bottom))]  ">
        <div className="flex flex-col items-center gap-3">
          {/* The hidden file input will go here */}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            onChange={handleImageCapture}
          />
          {/* The camera button */}
          <button
            type="button"
            className="w-full max-w-md overflow-hidden rounded-2xl border-6 border-dashed border-gray-200 text-center"
            onClick={openCamera}
          >
            <div className="flex min-h-70 flex-col items-center justify-center">
              {capturedImageUrl ? (
                <img
                  src={capturedImageUrl}
                  alt="Captured recyclables"
                  className=""
                />
              ) : (
                <div className="mx-6 my-8 flex flex-col items-center">
                  <CameraIcon className="h-25 fill-gray-200" />
                  <p className="font-medium text-gray-500 text-lg">
                    Capture your recyclables
                  </p>
                  <p className="text-gray-400">
                    Use your camera to take a photo for verification
                  </p>
                </div>
              )}
            </div>
          </button>

          {/* The open camera button */}
          {capturedImageUrl ? (
            <div className="grid w-full max-w-md gap-3 grid-cols-2 items-center justify-center">
              <button
                className="text-[#727272] p-3 rounded-lg text-sm shadow-md min-w-27 bg-white"
                onClick={openCamera}
              >
                Retake
              </button>
              <button
                className="bg-[#74C857] text-white p-3 rounded-lg text-sm shadow-md min-w-27"
                onClick={() => {
                  setIsFormVisible(true);
                  setTimeout(() => {
                    document
                      .getElementById("form")
                      ?.scrollIntoView({ behavior: "smooth" });
                  });
                  
                }}
              >
                Next
              </button>
            </div>
          ) : (
            <button
              className="bg-[#74C857] text-white p-3 rounded-lg text-sm shadow-md min-w-27"
              onClick={openCamera}
            >
              Open Camera
            </button>
          )}
        </div>

        {isFormVisible && (
          <div className="flex flex-col gap-8" id="form">
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
                  placeholder="e.g. 1kg"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-sm text-[#727272] px-2">
                  Purok / Sitio
                </label>
                <input
                  type="text"
                  className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors"
                  placeholder="e.g. Sitio 1"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-sm text-[#727272] px-2">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors"
                  placeholder="Enter your notes here"
                />
              </div>
            </div>

            <button
              className="bg-[#74C857] text-white py-2.5 rounded-lg"
              onClick={() => {
                setIsSubmit(true)
                setCapturedImageUrl(null)
              }}
            >
              Submit Request
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
