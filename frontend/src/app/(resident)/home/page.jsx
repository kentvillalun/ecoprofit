"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import { BellIcon } from "@heroicons/react/24/outline";
import { CameraIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { PageContent } from "@/components/layout/PageContent.jsx";
import { Page } from "@/components/layout/Page.jsx";
import { Card } from "@/components/ui/Card";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function HomePage() {
  return (
    <Page gradient={true}>
      <header className="flex flex-row items-start justify-between min-w-full max-h-18.75 bg-white fixed top-0 p-5 ">
        <div className="flex flex-row justify-between min-w-full ">
          <Image src="/logo-solo.svg" width={32} height={38} alt="Logo" />
          <Link href={"/announcements"}>
            <BellIcon className="w-7.25 h-7.25" />
          </Link>
        </div>
      </header>

      <PageContent>
        <div className="flex flex-col items-start">
          <p className="font-medium text-sm">Hi, Jaymar</p>
          <p className="text-sm">
            Sell your recyclables to Barangay Beddend Laud
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Link
            className="bg-[#89D957] min-h-45 min-w-45 flex flex-col items-center justify-start gap-1 pt-7 rounded-full border-2 border-white shadow-gray-400 shadow-lg"
            href={"/capture"}
          >
            <CameraIcon className="h-21 w-21 fill-white" />
            <p className="font-medium text-sm text-white">
              Capture Recyclables
            </p>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="flex-col items-start">
            <p className="font-medium text-xs">Barangay Schedule Today:</p>
            <p className="text-xs text-[#727272]">
              Tue & Thu — 9:00 AM to 4:00 PM
            </p>
          </Card>
          <Card className="flex-col items-start">
            <p className="font-medium text-xs">Current Buying Prices:</p>
            <p className="text-xs text-[#727272]">PET: ₱8/kg</p>
            <p className="text-xs text-[#727272]">Cardboard: ₱5/kg</p>
          </Card>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-medium text-xs">Recent Requests</p>
          <div className="flex flex-col gap-3">
            <Card className="grid grid-cols-2 items-start bg-white">
              <div className="text-sm">
                <p className="">Plastic & Paper</p>
                <p className="text-[#727272]">Sep 10</p>
              </div>

              <div className="text-xs flex flex-col gap-2 ">
                <div className="flex items-center  justify-end">
                  <div className="font-medium text-[#74C857] bg-[#89D95720] px-2 py-1 rounded-3xl">
                    Completed
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-center justify-between">
                  <div className="font-medium text-[#727272]">Accepted</div>
                  <div className="font-medium text-[#727272] bg-[#D9D9D952] px-2 py-1 rounded-3xl">
                    Contact
                  </div>
                </div>
              </div>
            </Card>

            <Card className="grid grid-cols-2 items-start bg-white">
              <div className="text-sm">
                <p className="">Glass Bottles</p>
                <p className="text-[#727272]">Sep 9</p>
              </div>

              <div className="text-xs flex flex-col gap-2">
                <div className="flex items-center  justify-end">
                  <div className="font-medium text-[#EEB90E] bg-[#FCD50A25] px-2 py-1 rounded-3xl">
                    Pending
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-center justify-between">
                  <div className="font-medium text-[#727272]">Accepted</div>
                  <div className="font-medium text-[#727272] bg-[#D9D9D952] px-2 py-1 rounded-3xl">
                    Contact
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </PageContent>
    </Page>
  );
}
