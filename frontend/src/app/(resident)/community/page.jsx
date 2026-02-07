import { ResidentHeader } from "@/components/navigation/ResidentHeader";
import { PageContent } from "@/components/layout/PageContent";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { Page } from "@/components/layout/Page";
import { Card } from "@/components/ui/Card";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function CommunityPage() {
  return (
    <Page gradient={true}>
      <ResidentHeader
        title={"Barangay Beddeng Laud"}
        subtitle={"EcoAid Program"}
        notification={true}
      />

      <PageContent>
        <div className="mt-4 flex flex-col gap-4">
          {/* Collection Schedule */}
          <Card className="gap-6 flex-row">
            <div className="">
              <Image
                src={"/calendar.svg"}
                width={52}
                height={52}
                alt="Calendar"
              />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <p className="font-medium">Collection Schedule</p>
              <div className="">
                <div className="">
                  Collection Days:{" "}
                  <span className="text-[#727272]">Every Sunday</span>
                </div>
                <div className="">
                  Time:{" "}
                  <span className="text-[#727272]">9:00 AM - 4:30 PM</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Accepted Materials */}
          <Card className="gap-6 flex-row">
            <div className="">
              <Image
                src={"/leaves.svg"}
                width={52}
                height={52}
                alt="Calendar"
              />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <p className="font-medium">Accepted Materials</p>
              <ul className="text-[#727272] list-disc list-inside">
                <li>
                  <span className="">Plastic Bottles</span>
                </li>
                <li>
                  <span className="">Cardboard/ Cartons</span>
                </li>
                <li>
                  <span className="">Cans</span>
                </li>
                <li>
                  <span className="">Metals</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* How It Works */}
          <Card className="flex-col items-start gap-1">
            <p className="font-medium">How It Works</p>
            <div className="flex flex-row gap-4 items-center ">
              <div className="flex flex-row gap-2 ">
                <div className="text-primary border-2 rounded-full h-8 w-8 text-center text-lg font-medium">
                  1
                </div>
                <div className="text-primary border-2 rounded-full h-8 w-8 text-center text-lg font-medium">
                  2
                </div>
                <div className="text-primary border-2 rounded-full h-8 w-8 text-center text-lg font-medium">
                  3
                </div>
              </div>
              <ul className="flex flex-col text-[#727272] text-sm list-decimal list-inside">
                <li className="">Post your recyclables.</li>
                <li className="">Barangay approves & picks up.</li>
                <li className="">
                  Wait for the barangay to verify your reward.
                </li>
              </ul>
            </div>
          </Card>

          {/* Barangay Contact Info */}
          <Card className="flex-row gap-6">
            <div className="">
              <Image
                src={"/contact.svg"}
                width={52}
                height={52}
                alt="Calendar"
              />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <p className="font-medium">Barangay Information</p>
              <div className="">
                <div className="">
                  Barangay Office:{" "}
                  <span className="text-[#727272]">09XX-XXX-XXXX</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </PageContent>
    </Page>
  );
}
