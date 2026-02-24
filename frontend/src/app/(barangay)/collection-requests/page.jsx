"use client";

import { Page } from "@/components/layout/Page";
import { PageContent } from "@/components/layout/PageContent";
import { BarangayTopBar } from "@/components/navigation/BarangayTopBar";
import { BarangayHeaderCard } from "@/components/ui/BarangayHeaderCard";
import { RequestCard } from "@/components/requests/RequestCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { StatusChip } from "@/components/ui/StatusChip";
import { useState } from "react";
import { Inter } from "next/font/google";
import { mockRequests } from "./mockRequests";
import { RequestTable } from "@/components/requests/RequestTable";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function CollectionRequests() {
  const [currentTab, setCurrentTab] = useState("pending");

  const STATUS_TABS = [
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "pickup", label: "For Pickup" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <Page>
      <BarangayTopBar title="Collection Requests" />
      <PageContent className="bg-[#F3F3FF]! md:pl-70 md:p-6 md:gap-5">
        <BarangayHeaderCard
          title={"Request"}
          subtitle={"Review pickup requests and set schedules."}
        />
        <SearchInput />
        <div className="flex flex-col">
          <StatusChip
            STATUS_TABS={STATUS_TABS}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          <div className={`${inter.className}`}>
            {currentTab === "pending" && (
              <h2 className="font-semibold text-xl pb-2 pl-3 md:pl-0">
                Pending Request
              </h2>
            )}
            <div className="flex md:hidden flex-col gap-2">
              {mockRequests.map((r) => (
                <RequestCard data={r} key={r.id} />
              ))}
            </div>
            <RequestTable mockRequests={mockRequests} status={"pending"}/>
          </div>
        </div>
      </PageContent>
    </Page>
  );
}
