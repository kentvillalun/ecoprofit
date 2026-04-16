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
import { AddProgramModal } from "@/components/redemption/modals/AddProgramModal";
import { useFetch } from "@/hooks/useFetch";
import { Badge } from "@/components/ui/Badge";
import { MaterialPill } from "@/components/ui/MateriaPill";

export default function RedemptionProgramPage() {
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const url = "/api/redemption/programs";
  const [refetchCount, setRefetchCount] = useState(0);
  const { data, isError, isLoading, error } = useFetch({ url, refetchCount });

  if (isLoading) return <p className="md:pl-77">Loading....</p>;
  if (isError) return <p className="md:pl-77">{error}</p>;

  return (
    <Page>
      <BarangayTopBar title={"Redemption Management"} />
      <PageContent className="bg-[#F3F3FF]! md:pl-77 md:p-6 md:gap-7">
        <BarangayHeaderCard
          title={"Redemption Management"}
          subtitle={"Create and manage redemption programs and transactions"}
        />

        {/* Add Program modal */}
        {isProgramModalOpen &&
          createPortal(
            <AddProgramModal
              isProgramModalOpen={isProgramModalOpen}
              setIsProgramModalOpen={setIsProgramModalOpen}
              setRefetchCount={setRefetchCount}
            />,
            document.body,
          )}

        <section className="flex flex-col gap-3">
          <SectionHeader
            title={"Programs"}
            subtitle={"Active redemption programs"}
            icon={<GiftIcon className="w-6 stroke-black" />}
            buttonLabel={"Add Program"}
            onAction={() => setIsProgramModalOpen(true)}
          />
          <div className={`grid gap-3 ${data?.programs.length === 1 && "grid-cols-1"} ${data?.programs.length === 2 && "md:grid-cols-2"} ${data?.programs.length >= 3 && "md:grid-cols-3"}`}>
            {data?.programs.map((p) => (
              <Card className="flex flex-col items-start gap-4 p-5! border-l-4 border-primary hover:-translate-y-0.5 transition-all duration-200 ease-in-out hover:cursor-pointer" key={p.id}>
                <div className="flex flex-row items-center justify-between w-full">
                  <h4 className="text-base font-semibold">{p.name}</h4>
                  <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">Active</span>
                </div>
                <div className="flex flex-row gap-6">
                  <LabelValue name="Budget" value={`₱ ${p.allotedBudget}`} />
                  <LabelValue name="Max Points" value={`${p.maxPoints} pts`} />
                </div>
                <div className="flex flex-row flex-wrap gap-2 pt-3 border-t border-gray-100 w-full">
                  {p.programMaterial.map((m) => (
                    <MaterialPill type={m.materialType} points={m.pointValue} key={m.id} />
                  ))}
                </div>
              </Card>
            ))}
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
