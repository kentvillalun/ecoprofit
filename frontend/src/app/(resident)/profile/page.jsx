import { Page } from "@/components/layout/Page";
import { PageContent } from "@/components/layout/PageContent";
import { ResidentHeader } from "@/components/navigation/ResidentHeader";
import Image from "next/image";
import {
  ListBulletIcon,
  BellIcon,
  Cog8ToothIcon,
  QuestionMarkCircleIcon,
  ArrowLeftStartOnRectangleIcon
} from "@heroicons/react/24/outline";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <Page gradient={true}>
      <ResidentHeader title={"Profile"} />

      <PageContent>
        <section className="flex flex-col gap-5">
          <div className="flex flex-col items-center gap-4">
            <div className="border-5 rounded-full max-h-40 max-w-40 border-[#74C857] shadow-xl overflow-hidden flex items-center justify-center">
              <Image src={"/profile.jpg"} width={143} height={140} alt="Profile picture"/>
            </div>
            <div className="text-center ">
              <p className="font-semibold text-lg">Jaymar Tabangin</p>
              <p className="text-sm text-[#727272]">Brgy. Beddeng Laud</p>
            </div>
          </div>

          <div className="flex flex-col gap-14">
            <div className="flex flex-col gap-2">
              <Link href={"/profile/personal-information"}>
                <Card className="flex-row gap-5">
                  <div className="min-w-10 min-h-10 rounded-full bg-[#9DB2CE26] flex items-center justify-center">
                    <ListBulletIcon className="w-6 h-6" />
                  </div>
                  <p className="font-medium">Personal Information</p>
                </Card>
              </Link>

              <Link href={""}>
                <Card className="flex-row gap-5">
                  <div className="min-w-10 min-h-10 rounded-full bg-[#9DB2CE26] flex items-center justify-center">
                    <BellIcon className="w-6 h-6" />
                  </div>
                  <p className="font-medium">Notification Settings</p>
                </Card>
              </Link>

              <Link href={""}>
                <Card className="flex-row gap-5">
                  <div className="min-w-10 min-h-10 rounded-full bg-[#9DB2CE26] flex items-center justify-center">
                    <Cog8ToothIcon className="w-6 h-6" />
                  </div>
                  <p className="font-medium">Settings</p>
                </Card>
              </Link>

              <Link href={""}>
                <Card className="flex-row gap-5">
                  <div className="min-w-10 min-h-10 rounded-full bg-[#9DB2CE26] flex items-center justify-center">
                    <QuestionMarkCircleIcon className="w-6 h-6" />
                  </div>
                  <p className="font-medium">Help & Support</p>
                </Card>
              </Link>
            </div>

            <Card className="flex-row gap-5">
              <div className="min-w-10 min-h-10 rounded-full bg-[#9DB2CE26] flex items-center justify-center">
                <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
              </div>
              <p className="font-medium ">Log out</p>
            </Card>
          </div>
        </section>
      </PageContent>
    </Page>
  );
}
