"use client";

import { Inter } from "next/font/google";
import Image from "next/image";
import { BellIcon } from "@heroicons/react/24/outline";
import { CameraIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { PageContent } from "@/components/layout/PageContent.jsx";
import { Page } from "@/components/layout/Page.jsx";
import { Card } from "@/components/ui/Card";
import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  CalendarDaysIcon,
  ArrowPathIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { MaterialPill } from "@/components/ui/MateriaPill";
import { Pill } from "@/components/ui/Pill";
import { formatDate } from "@/lib/formatDate";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function HomePage() {
  const [refetchCount, setRefetchCount] = useState(0);
  const url = `/api/resident/me`;
  const { isLoading, data, isError } = useFetch({ url, refetchCount });

  const [requestsRefetchCount, setRequestsRefetchCount] = useState(0);
  const requestsUrl = `/api/pickup-requests/my-requests`;
  const {
    isLoading: requestLoading,
    isError: requestError,
    data: requestData,
  } = useFetch({ url: requestsUrl, refetchCount: requestsRefetchCount });

  return (
    <Page gradient={true}>
      <header className="flex flex-row items-start justify-between min-w-full max-h-18.75 bg-white fixed top-0 p-5 shadow-lg ">
        <div className="flex flex-row justify-between min-w-full ">
          <Image src="/logo-solo.svg" width={32} height={38} alt="Logo" />
          <Link href={"/announcements"}>
            <BellIcon className="w-7.25 h-7.25" />
          </Link>
        </div>
      </header>

      <PageContent>
        <div className="flex flex-col items-start">
          {isLoading ? (
            <Skeleton width={50} />
          ) : (
            <p className="font-medium text-sm">
              {" "}
              Hi, {data?.user?.firstName} 👋
            </p>
          )}
          {isLoading ? (
            <Skeleton width={150} />
          ) : (
            <p className="text-sm">
              Sell your recyclables to {data?.user?.barangay}
            </p>
          )}
        </div>

        <div className="flex items-center justify-center">
          <Link
            className="bg-[#89D957] min-h-45 min-w-45 flex flex-col items-center justify-start gap-1 pt-7 rounded-full border-2 border-white shadow-gray-400 shadow-lg"
            href={"/capture"}
          >
            <CameraIcon className="h-27 w-27 fill-white" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="flex-col items-start gap-2">
            <div className="border p-3 border-none rounded-lg items-center bg-[#89d95720]">
              <CalendarDaysIcon className="w-6 stroke-[#89d957]" />
            </div>
            <div className="text-xs flex flex-col gap-2">
              <p className="uppercase  text-gray-400">ECOAID SCHEDULE</p>
              <div className="">
                <p className="">Every Sunday</p>
                <p className=" text-gray-600">8:00 AM - 12:00 PM</p>
              </div>
            </div>
          </Card>
          <Card className="flex-col items-start gap-2">
            <div className="border p-3 border-none rounded-lg items-center bg-[#89d95720]">
              <ArrowPathIcon className="w-6 stroke-[#89d957]" />
            </div>
            <div className="text-xs flex flex-col gap-2">
              <p className="uppercase  text-gray-400">accepted materials</p>
              <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
                <MaterialPill type={"PLASTICS"} className="px-1! w-15!" />
                <MaterialPill type={"PAPERS"} className="px-1! w-15!" />
                <MaterialPill type={"BOTTLES"} className="px-1! w-15!" />
                <MaterialPill type={"METALS"} className="px-1! w-15!" />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm flex flex-row justify-between">
            <p className="font-medium ">Recent Requests</p>
            <Link className="flex flex-row " href={"/requests"}>
              <p className="">View all</p>{" "}
              <ChevronRightIcon className="w-4" />{" "}
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {requestLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="flex flex-col items-start">
                    <div className="flex flex-row justify-between w-full">
                      <Skeleton width={80} />
                      <Skeleton width={120} />
                    </div>
                    <Skeleton width={150} />
                    <Skeleton width={150} />
                    <div className="flex flex-row items-end justify-end w-full">
                      <Skeleton width={50} />
                    </div>
                  </Card>
                ))
              : requestData?.requests?.map((r) => (
                  <Card
                    className={`flex flex-col items-start gap-3 transition-all hover:cursor-pointer hover:-translate-y-0.5 duration-200 ease-in-out`}
                    key={r.id}
                  >
                    {/* Top row */}
                    <div className="flex flex-row justify-between w-full">
                      <div className="flex flex-col gap-0.5">
                        <h3 className="font-semibold text-[#1F2937] capitalize">
                          {r.materialType.toLowerCase()}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {r.notes ? r.notes : "No notes available"}
                        </p>
                        <p className="text-sm text-gray-400">
                          {formatDate(r.createdAt)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Pill type={r.status} />
                      </div>
                    </div>

                    {/* Footer row */}
                    <div className="flex flex-row items-end justify-end w-full pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-400">
                        Est. {r.estimatedWeight}{" "}
                        <span className="lowercase">{r.weightUnit}</span>
                      </p>
                    </div>
                  </Card>
                ))}
          </div>
        </div>
      </PageContent>
    </Page>
  );
}
