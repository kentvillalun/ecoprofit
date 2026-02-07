import { Page } from "@/components/layout/Page";
import { ResidentHeader } from "@/components/navigation/ResidentHeader";

export default function ProfilePage() {

    return (
        <Page gradient={true}>
            <ResidentHeader title={"Profile"}/>
        </Page>
    )
}