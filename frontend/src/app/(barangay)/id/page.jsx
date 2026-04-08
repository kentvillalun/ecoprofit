"use client";

import { Page } from "@/components/layout/Page";
import { PageContent } from "@/components/layout/PageContent";
import { BarangayTopBar } from "@/components/navigation/BarangayTopBar";
import { RequestDetailHeader } from "@/components/requests/RequestDetailHeader";
import { Card } from "@/components/ui/Card";
import { LabelValue } from "@/components/ui/LabelValue";
import { useState } from "react";

export default function RequestDetails() {
  const [fetchPhoto, setFetchPhoto] = useState("");
  return (
    <Page gradient={true}>
      <BarangayTopBar title={"Collection Request"} />
      <PageContent className="md:pl-77 md:p-6 md:gap-7 scrollbar">
        <RequestDetailHeader />

        <div className="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Card className="flex flex-col items-start gap-3">
              <h3 className="font-medium uppercase text-gray-600 text-sm">
                Resident Information
              </h3>
              <LabelValue name={"Full name"} value={"Juan Dela Cruz"} />
              <LabelValue name={"Contact number"} value={"0917 123 4567"} />
              <LabelValue name={"Sitio"} value={"Purok 3"} />
            </Card>
            <Card className="flex flex-col items-start gap-3">
              <h3 className="font-medium uppercase text-gray-600 text-sm">
                Request Information
              </h3>
              <LabelValue name={"Material type"} value={"BOTTLES"} />
              <LabelValue name={"Estimated weight"} value={"12 KG"} />
              <LabelValue name={"Notes"} value={"Halo halo ang laman ng bag"} />
            </Card>
          </div>
          <Card className="flex flex-col items-start gap-3">
            <h3 className="font-medium uppercase text-gray-600 text-sm">
              Photo evidence
            </h3>
            <div className="flex min-h-70 flex-col items-center justify-center border rounded-lg border-gray-300 w-full">
              {fetchPhoto ? (
                <img src={fetchPhoto} alt="Captured recyclables" className="" />
              ) : (
                <div className="mx-6 my-8 flex flex-col items-center">
                  <p className="text-gray-400">No photo uploaded</p>
                </div>
              )}
            </div>
          </Card>
          <Card className="flex flex-col items-start gap-3">
            <h3 className="font-medium uppercase text-gray-600 text-sm">
              Timeline
            </h3>
            <LabelValue name={"Submitted"} value={"Jan 14, 2026 10:32 AM"} />
          </Card>
          <Card className="flex flex-col gap-3 items-start">
            <h3 className="font-medium uppercase text-gray-600 text-sm">
              actions
            </h3>
            <div className="grid grid-cols-2 text-md font-semibold gap-3 w-full">
              <button
                className="py-2.5 text-white rounded-lg hover:cursor-pointer bg-red-500"
                type="button"
              >
                Decline
              </button>
              <button
                className={`py-2.5   text-white rounded-lg hover:cursor-pointer bg-primary`}
                type="button"
              >
                Approve
              </button>
            </div>
          </Card>
        </div>
      </PageContent>
    </Page>
  );
}
