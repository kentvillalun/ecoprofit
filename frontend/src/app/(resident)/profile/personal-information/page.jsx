import { Page } from "@/components/layout/Page.jsx";
import { ResidentHeader } from "@/components/navigation/ResidentHeader";
import Image from "next/image";

// Copy the Profile Info form now
// Implement isEditing toggle + Save button

export default function PersonalInformationPage() {
  const profileFields = [
    {
      label: "Full Name",
      name: "fullName",
      placeholder: "Juan Dele Cruz",
      editable: true,
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      placeholder: "09XX XXX XXXX",
      editable: true,
    },
    {
      label: "Address / Purok",
      name: "address",
      placeholder: "Juan Dele Cruz",
      editable: true,
    },
    {
      label: "Full Name",
      name: "fullName",
      placeholder: "Juan Dele Cruz",
      editable: true,
    },
  ];


  return (
    <Page gradient={true}>
      <ResidentHeader title={"Personal Information"} />

      <main className="absolute left-0 right-0 top-18 h-[calc(100dvh-72px)] px-3 pt-3 flex flex-col gap-6 overflow-y-auto ">
        <section className="grid grid-cols-1 gap-6">
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

          <div className=" mt-2 bg-white p-8 rounded-t-[20px] flex flex-col gap-8 "></div>
        </section>
      </main>
    </Page>
  );
}
