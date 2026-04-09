"use client";

import { Card } from "../ui/Card";
import { ArrowLeftIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { Pill } from "../ui/Pill";

export const RequestDetailHeader = ({type}) => {
  return (
    <Card className="flex flex-row gap-7">
      <ArrowLeftIcon
        className="h-6 text-[#727272] hover:cursor-pointer"
        onClick={() => history.back()}
      />
      <div className="">
        <div className="flex flex-row gap-4 items-center">
          <div className="border p-3 border-gray-200 rounded-lg md:flex items-center hidden">
            {/* <ExclamationTriangleIcon className="w-6 stroke-black" /> */}
            <ClipboardIcon className="w-6 stroke-black" />
          </div>
          <div className="">
            <div className="flex flex-row gap-5 items-center justify-between">
              <h2 className="font-medium text-xl">Request Details</h2>
              
              <Pill type={type}/>
            </div>
            <p className="">Review the full details of this pickup request</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
