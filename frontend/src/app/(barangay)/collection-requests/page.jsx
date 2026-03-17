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
  const [currentTab, setCurrentTab] = useState("requested");

  const STATUS_TABS = [
    { key: "requested", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "collected", label: "Collected" },
    { key: "rejected", label: "Rejected" },
  ];

  const titles = {
    requested: "Pending Requests",
    approved: "Approved Requests",
    collected: "Collected Requests",
    rejected: "Rejected Requests",
  };
  return (
    <Page>
      <BarangayTopBar title="Collection Requests" />
      <PageContent className="bg-[#F3F3FF]! md:pl-77 md:p-6 md:gap-7">
        <BarangayHeaderCard
          title={"Collection Requests"}
          subtitle={
            "Review and manage resident pickup requests for recyclable collection."
          }
        />
        <SearchInput />
        <div className="flex flex-col gap-3">
          <StatusChip
            STATUS_TABS={STATUS_TABS}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />

          {currentTab && (
            <div className={`${inter.className}`}>
              <h2 className="font-semibold text-xl pb-2 pl-3 md:pl-0">
                {titles[currentTab]}
              </h2>

              <div className="flex md:hidden flex-col gap-2">
                <RequestCard data={mockRequests} status={currentTab} />
              </div>
              <RequestTable data={mockRequests} status={currentTab} />
            </div>
          )}
        </div>
      </PageContent>
    </Page>
  );
}
 