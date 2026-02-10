"use client";

import { Page } from "@/components/layout/Page.jsx";
import { ResidentHeader } from "@/components/navigation/ResidentHeader";
import Image from "next/image";
import { useState } from "react";

// Copy the Profile Info form now
// Implement isEditing toggle + Save button

export default function PersonalInformationPage() {
  const [isEditing, setIsEditing] = useState(false);

  const profileFields = [
    {
      label: "First Name",
      name: "firstName",
      placeholder: "Juan",
      editable: true,
    },
    {
      label: "Last Name",
      name: "lastName",
      placeholder: "Dela Cruz",
      editable: true,
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      placeholder: "09XX XXX XXXX",
      editable: true,
    },
    {
      label: "Address",
      name: "address",
      placeholder: "Enter your address",
      editable: true,
    },
    {
      label: "Purok",
      name: "purok",
      placeholder: "Sitio 1",
      editable: true,
    },
    {
      label: "Registered Barangay",
      name: "registeredBarangay",
      placeholder: "Beddend Laud",
      editable: false,
    },
  ];

  return (
    <Page gradient={true}>
      <ResidentHeader
        title={"Personal Information"}
        action={"edit"}
        setIsEditing={setIsEditing}
      />

      <main className="absolute left-0 right-0 top-18 bottom-0 h-[calc(100dvh-72px)] px-3 pt-3 flex flex-col gap-6 overflow-y-auto ">
        <section className="grid grid-cols-1 gap-6 justify-between h-full">
          <div className="flex flex-col items-center gap-4">
            <div className="border-5 rounded-full max-h-40 max-w-40 border-[#74C857] shadow-xl overflow-hidden flex items-center justify-center">
              <Image
                src={"/profile.jpg"}
                width={143}
                height={140}
                alt="Profile picture"
              />
            </div>
            <div className="text-center ">
              <p className="font-semibold text-lg">Jaymar Tabangin</p>
            </div>
          </div>

          <div className="mt-2 bg-white p-8 rounded-t-[20px] flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              {profileFields.map((p, id) => (
                <div
                  className="flex flex-col gap-1 border-b border-[#E7E3E0] p-2.5 text-sm"
                  key={id}
                >
                  <label htmlFor="" className="text-start font-medium">
                    {p.label}
                  </label>
                  <input
                    type="text"
                    className="outline-none"
                    placeholder={p.placeholder}
                    disabled={!p.editable}
                  />
                </div>
              ))}
            </div>
            {isEditing && (
              <button className="bg-primary text-white text-center min-w-full py-3 rounded-3xl" onClick={() => setIsEditing(false)}>
                Save Changes
              </button>
            )}
          </div>
        </section>
      </main>
    </Page>
  );
}
