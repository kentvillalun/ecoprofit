"use client";

import { Page } from "@/components/layout/Page";
import { BarangayTopBar } from "@/components/navigation/BarangayTopBar";
import { PageContent } from "@/components/layout/PageContent";

export default function BarangayDashboardPage() {
  return (
    <Page>
      <BarangayTopBar title="Dashboard" />
      <PageContent className="bg-[#F3F3FF]! md:pl-80 md:p-6 md:gap-7">
        This is the barangay dashboard
      </PageContent>
    </Page>
  );
}
