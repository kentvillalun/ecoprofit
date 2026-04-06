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
import { RequestTable } from "@/components/requests/RequestTable";
import { useFetch } from "@/hooks/useFetch.js";
import { Modal } from "@/components/ui/Modal";


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function CollectionRequests() {
  const [refetchCount, setRefetchCount] = useState(1)
  const url = `/api/pickup-requests/collection-requests`;
  const { isLoading, isError, error, data } = useFetch({ url, refetchCount });
  const [currentTab, setCurrentTab] = useState("REQUESTED");

  const [selectedApprovedRequests, setSelectedApprovedRequests] = useState([]);
  if (isLoading) return <p className="md:pl-77">Loading....</p>
  if (isError) return <p className="md:pl-77">{error}</p>

  const handleApprovedRequestSelect = (requestId) => {
    setSelectedApprovedRequests((currentSelected) =>
      currentSelected.includes(requestId)
        ? currentSelected.filter((id) => id !== requestId)
        : [...currentSelected, requestId],
    );
  };

  // setter function for fecth count
  const handleRefetchCount = () => setRefetchCount(prev => prev + 1)
 

  const handleBatchCollection = () => {
    if (selectedApprovedRequests.length === 0) return;

    data.map((request) =>
      selectedApprovedRequests.includes(request.id)
        ? { ...request, status: "IN_PROGRESS" }
        : request,
    );

    setSelectedApprovedRequests([]);
  };

  const STATUS_TABS = [
    { key: "REQUESTED", label: "Pending" },
    { key: "APPROVED", label: "Approved" },
    { key: "IN_PROGRESS", label: "In Progress" },
    { key: "COLLECTED", label: "Collected" },
    { key: "REJECTED", label: "Rejected" },
  ];

  const titles = {
    REQUESTED: "Pending Requests",
    APPROVED: "Approved Requests",
    IN_PROGRESS: "In Progress Requests",
    COLLECTED: "Collected Requests",
    REJECTED: "Rejected Requests",
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
                  data={data?.requests}
                  status={currentTab}
                  selectedIds={selectedApprovedRequests}
                  onToggleSelect={handleApprovedRequestSelect}
                />
              </div>
              
              <RequestTable
                data={data?.requests}
                status={currentTab}
                selectedIds={selectedApprovedRequests}
                onToggleSelect={handleApprovedRequestSelect}
                handleRefetchCount={handleRefetchCount}
              />
            </div>
          )}
        </div>
        {currentTab === "APPROVED" && selectedApprovedRequests.length > 0 && (
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
