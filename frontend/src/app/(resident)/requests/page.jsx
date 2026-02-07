"use client";

import { Page } from "@/components/layout/Page";
import { PageContent } from "@/components/layout/PageContent";
import { ResidentHeader } from "@/components/navigation/ResidentHeader";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { useState } from "react";

export default function RequestsPage() {
  const [currentTab, setCurrectTab] = useState("ongoing"); // 'ongoing' || 'completed'

  const requests = [
    {
      id: 1,
      title: "Plastic Bottles Collection",
      status: "Approved",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Cardboard Pickup",
      status: "For Pickup",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Metal Scraps",
      status: "Completed",
      isCompleted: true,
    },
  ];

  const filteredRequests =
    currentTab === "ongoing"
      ? requests.filter((r) => !r.isCompleted)
      : requests.filter((r) => r.isCompleted);

  return (
    <Page gradient={true}>
      <ResidentHeader title={"Requests & History"} notification={true} />

      <PageContent className="overflow-hidden!">
        {/* Tab section */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`rounded-2xl shadow-lg py-3 font-medium text-[#727272] ${currentTab === "ongoing" ? "text-white bg-[#89D957]" : ""} transition-all duration-250 ease-out`}
              onClick={() => setCurrectTab("ongoing")}
            >
              Ongoing
            </button>
            <button
              className={`rounded-2xl shadow-lg py-3 font-medium text-[#727272] ${currentTab === "completed" ? "text-white bg-[#89D957]" : ""} `}
              onClick={() => setCurrectTab("completed")}
            >
              Completed
            </button>
          </div>

          <PageContent>
            <div className="flex flex-col gap-2">
                {filteredRequests.map(r => (
                    <Card className="flex flex-row items-start justify-between" key={r.id}>
                        <div className="flex flex-col gap-3">
                            <p className="font-medium text-md">{r.title}</p>
                            <p className="text-sm text-[#727272]">Cancel Requests</p>
                        </div>
                        <div className="flex flex-col justify-between items-center min-h-full">
                            <Pill type={r.status}/>
                            <p className=" text-sm text-[#727272]">View Details</p>
                        </div>
                    </Card>
                ))}
            </div>
          </PageContent>
        </div>
      </PageContent>
    </Page>
  );
}
