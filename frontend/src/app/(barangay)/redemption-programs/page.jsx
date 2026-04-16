"use client";

import { Page } from "@/components/layout/Page";
import { PageContent } from "@/components/layout/PageContent";
import { BarangayTopBar } from "@/components/navigation/BarangayTopBar";
import { TransactionCard } from "@/components/redemption/TransactionCard";
import { TransactionTable } from "@/components/redemption/TransactionTable";
import { BarangayHeaderCard } from "@/components/ui/BarangayHeaderCard";
import { Card } from "@/components/ui/Card";
import { LabelValue } from "@/components/ui/LabelValue";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GiftIcon, Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { mockdata } from "./mockdata";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "@/components/ui/Modal";
import { AddProgramModal } from "@/components/redemption/modals/AddProgramModal";

export default function RedemptionProgramPage() {
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);

  return (
    <Page>
      <BarangayTopBar title={"Redemption Management"} />
      <PageContent className="bg-[#F3F3FF]! md:pl-77 md:p-6 md:gap-7">
        <BarangayHeaderCard
          title={"Redemption Management"}
          subtitle={"Create and manage redemption programs and transactions"}
        />
        
        {/* Add Program modal */}
        {isProgramModalOpen && createPortal(<AddProgramModal isProgramModalOpen={isProgramModalOpen} setIsProgramModalOpen={setIsProgramModalOpen}/>, document.body)}

        <section className="flex flex-col gap-3">
          <SectionHeader
            title={"Programs"}
            subtitle={"Active redemption programs"}
            icon={<GiftIcon className="w-6 stroke-black" />}
            buttonLabel={"Add Program"}
            onAction={() => setIsProgramModalOpen(true)}
          />
          <div className="grid">
            <Card className="flex flex-col items-center justify-center border-b-3  border-primary hover:-translate-y-0.5 transition-all duration-200 ease-in-out hover:cursor-pointer min-h-30">
              <h4 className="md:text-xl text-lg font-medium">
                Back to School Drive 2026{" "}
              </h4>
              <div className=" flex flex-row items-center justify-center">
                <LabelValue
                  name={" Total budget"}
                  value={"P 20,000"}
                  className="flex-row! items-center gap-2"
                />
              </div>
            </Card>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <SectionHeader
            title={"Transaction history"}
            subtitle={"All recorded redemptions"}
            icon={<Bars3BottomLeftIcon className="w-6 stroke-black" />}
            buttonLabel={"Record transaction"}
          />
          <TransactionTable data={mockdata} />
          <TransactionCard data={mockdata} />
        </section>
      </PageContent>
    </Page>
  );
}
