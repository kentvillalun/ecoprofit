import { ResidentHeader } from "@/components/navigation/ResidentHeader";
import { Poppins } from "next/font/google";
import { BellSlashIcon } from "@heroicons/react/24/outline"
import { Page } from "@/components/layout/Page";

const poppins = Poppins({
    subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export default function AnnouncementsPage() {


    return (
        <Page>
            <ResidentHeader title={"Announcements"} />
            <section className="absolute left-0 right-0 top-18 h-[calc(100dvh-72px)] p-3 flex flex-col gap-6 overflow-y-auto pb-[calc(120px+env(safe-area-inset-bottom))] items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <BellSlashIcon className="stroke-[#74C857] h-25"/>
                    <p className="max-w-60 text-center">No announcements available at the moment</p>
                </div>
            </section>
        </Page>
    )
}