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
  const [requests, setRequests] = useState(mockRequests);
  const [selectedApprovedRequests, setSelectedApprovedRequests] = useState([]);

  const handleApprovedRequestSelect = (requestId) => {
    setSelectedApprovedRequests((currentSelected) =>
      currentSelected.includes(requestId)
        ? currentSelected.filter((id) => id !== requestId)
        : [...currentSelected, requestId]
    );
  };

  const handleBatchCollection = () => {
    if (selectedApprovedRequests.length === 0) return;

    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        selectedApprovedRequests.includes(request.id)
          ? { ...request, status: "in_progress" }
          : request
      )
    );
    setSelectedApprovedRequests([]);
  };

  const STATUS_TABS = [
    { key: "requested", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "in_progress", label: "In Progress" },
    { key: "collected", label: "Collected" },
    { key: "rejected", label: "Rejected" },
  ];

  const titles = {
    requested: "Pending Requests",
    approved: "Approved Requests",
    in_progress: "In Progress Requests",
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
        <div className="flex flex-col gap-3 scrollbar">
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
                <RequestCard
                  data={requests}
                  status={currentTab}
                  selectedIds={selectedApprovedRequests}
                  onToggleSelect={handleApprovedRequestSelect}
                />
              </div>
              <RequestTable
                data={requests}
                status={currentTab}
                selectedIds={selectedApprovedRequests}
                onToggleSelect={handleApprovedRequestSelect}
              />
            </div>
          )}
        </div>
        {currentTab === "approved" && selectedApprovedRequests.length > 0 && (
          <div className="fixed bottom-6 left-4 right-4 z-20 md:left-auto md:right-6">
            <button
              className="w-full rounded-2xl bg-primary px-5 py-4 text-white shadow-lg transition-all duration-200 hover:cursor-pointer hover:opacity-90 md:w-auto"
              onClick={handleBatchCollection}
            >
              Create Batch Collection ({selectedApprovedRequests.length})
            </button>
          </div>
        )}
      </PageContent>
    </Page>
  );
}
 
