import { Page } from "@/components/layout/Page";
import { PageContent } from "@/components/layout/PageContent";
import { BarangayTopBar } from "@/components/navigation/BarangayTopBar";
import { BarangayHeaderCard } from "@/components/ui/BarangayHeaderCard";

export default function CollectionRequests() {
  return (
    <Page>
        
      <BarangayTopBar title="Collection Requests" />
      <PageContent className="bg-[#F3F3FF]!">
        
        <BarangayHeaderCard title={"Request"} subtitle={"Review pickup requests and set schedules."}/>

        
      </PageContent>
    </Page>
  );
}
