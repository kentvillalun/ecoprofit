"use client";

import { Page } from "@/components/layout/Page";
import { PageContent } from "@/components/layout/PageContent";
import { ResidentHeader } from "@/components/navigation/ResidentHeader";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Card } from "@/components/ui/Card";

export default function RequestDetailPage() {
  const [refetchCount, setRefetchCount] = useState(0);
  const { id } = useParams();
  const url = `/api/pickup-requests/my-requests/${id}`;
  const { isLoading, isError, data } = useFetch({ url, refetchCount });

  return (
    <Page gradient={false} className="bg-[#F3F3FF]!">
      <ResidentHeader title={"Request Detail"} />
      <PageContent className="bg-[#F3F3FF]!" withBottomNav={false} >
        <Card>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa molestias distinctio eius architecto? Quae, natus hic culpa qui quidem provident omnis aliquam? Beatae exercitationem quidem eligendi corrupti distinctio dolorum libero excepturi voluptate nulla? Quod in ipsum explicabo corrupti facere asperiores autem tenetur quidem laborum, ipsam accusantium repudiandae reprehenderit mollitia, expedita quis quae provident veniam illo dolore placeat aperiam quibusdam! Nostrum error quibusdam cupiditate, laboriosam magnam repellat est ea quaerat corporis quia id et tenetur voluptatum doloribus, esse culpa similique debitis placeat molestias tempore vero nisi eaque! Magnam laudantium quaerat reprehenderit, laboriosam, aspernatur natus asperiores illum nam aliquid, pariatur laborum itaque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, adipisci! Ullam aspernatur ab magni vero veniam quo exercitationem nisi necessitatibus nulla? Doloribus expedita totam nostrum quia ratione accusamus, repellat debitis vero. Illum eius facere rem excepturi. Voluptatem laudantium quia neque, aut saepe nisi harum modi fugiat temporibus aliquam quos. Enim? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore ad dolor sunt pariatur odio impedit, temporibus repellendus excepturi mollitia eveniet laborum non dolore sit soluta maiores, dolores provident! Explicabo, similique modi! Ex maiores quis obcaecati, repellat consectetur dicta esse non, soluta, numquam maxime totam laborum id eius ratione dolorem eligendi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque possimus molestiae dolor recusandae maiores sequi, assumenda officiis cumque? Magnam, dolor? Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, alias.
        </Card>
      </PageContent>
    </Page>
  );
}
