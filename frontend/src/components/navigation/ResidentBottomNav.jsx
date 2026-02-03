import { Poppins } from "next/font/google";
import {
  HomeIcon,
  MapPinIcon,
  ClipboardIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { CameraIcon } from "@heroicons/react/24/solid";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ResidentBottomNav = () => {
  return (
    <section className="min-h-18.75 absolute bottom-0 bg-white min-w-screen pb-2.25 flex flex-row items-center justify-center px-7.75">
      <div className="grid grid-cols-5 gap-1 text-[#9DB2CE]">
        <div className="flex flex-col items-center justify-center">
          <HomeIcon className="h-6.25 w-6.25" />
          <p className="text-[12px]">Home</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <MapPinIcon className="h-6.25 w-6.25" />
          <p className="text-[12px]">Barangay</p>
        </div>

        <div className="min-w-16 min-h-16 bg-[#89D957] flex items-center justify-center rounded-full border-2 border-white shadow-gray-400 shadow-lg trasform -translate-y-10">
          <CameraIcon className="fill-white h-7.75  w-7.75" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <ClipboardIcon className="h-6.25 w-6.25" />
          <p className="text-[12px]">Requests</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <UserIcon className="h-6.25 w-6.25" />
          <p className="text-[12px]">Profile</p>
        </div>
      </div>
    </section>
  );
};
