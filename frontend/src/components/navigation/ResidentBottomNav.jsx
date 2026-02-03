import { Poppins } from "next/font/google";
import {
  HomeIcon,
  MapPinIcon,
  ClipboardIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { CameraIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ResidentBottomNav = () => {
  return (
    <section className="min-h-18.75 bottom-0 bg-white min-w-screen pb-2.25 flex flex-row items-center justify-center px-3 z-1000 fixed">
      <div className="grid grid-cols-3 gap-1 text-[#9DB2CE]">
        <div className="grid grid-cols-2 gap-3">
          <Link className="flex flex-col items-center justify-center" href="/home">
            <HomeIcon className="h-6.25 w-6.25" />
            <p className="text-[12px]">Home</p>
          </Link>
          <Link className="flex flex-col items-center justify-center" href="/community">
            <MapPinIcon className="h-6.25 w-6.25" />
            <p className="text-[12px]">Barangay</p>
          </Link>
        </div>

        <div className="">
          <Link className="min-w-16 min-h-16 bg-[#89D957] flex items-center justify-center rounded-full border-2 border-white shadow-gray-400 shadow-lg trasform -translate-y-10" href="/capture">
            <CameraIcon className="fill-white h-7.75  w-7.75" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link className="flex flex-col items-center justify-center" href="/requests">
            <ClipboardIcon className="h-6.25 w-6.25" />
            <p className="text-[12px]">Requests</p>
          </Link>
          <Link className="flex flex-col items-center justify-center" href="/profile">
            <UserIcon className="h-6.25 w-6.25" />
            <p className="text-[12px]">Profile</p>
          </Link>
        </div>
      </div>
    </section>
  );
};
