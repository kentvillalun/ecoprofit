"use client";

import { Page } from "@/components/layout/Page";
import { PageContent } from "@/components/layout/PageContent";
import { BarangayTopBar } from "@/components/navigation/BarangayTopBar";
import { RequestDetailHeader } from "@/components/requests/RequestDetailHeader";
import { Card } from "@/components/ui/Card";
import { LabelValue } from "@/components/ui/LabelValue";
import { formatDate } from "@/lib/formatDate";
import { useParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { PendingActions } from "@/components/requests/actions/PendingActions";
import { ApprovedActions } from "@/components/requests/actions/ApprovedActions";
import { InProgressActions } from "@/components/requests/actions/InProgressActions";
import { useRouter } from "next/navigation";

export default function RequestDetails() {
  const { id } = useParams();
  const url = `/api/pickup-requests/collection-requests/${id}`;
  const { isLoading, isError, data, error } = useFetch({ url });
  console.log(data?.request?.collectionItems);
  if (isLoading) return <p className="md:pl-77">Loading....</p>;
  if (isError) return <p className="md:pl-77">{error}</p>;

  const router = useRouter();

  return (
    <Page gradient={true}>
      <BarangayTopBar title={"Collection Request"} />
      <PageContent className="md:pl-77 md:p-6 md:gap-7 scrollbar">
        <RequestDetailHeader type={data?.request?.status} />

        <div className="grid grid-cols-1 gap-3">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3`}>
            <Card className="flex flex-col items-start gap-3">
              <h3 className="font-medium uppercase text-gray-600 text-sm">
                Resident Information
              </h3>
              <LabelValue
                name={"Full name"}
                value={`${data?.request?.user?.firstName ? `${data.request.user.lastName}, ${data.request.user.firstName}` : "This user has not set their name yet"}`}
              />
              <LabelValue
                name={"Contact number"}
                value={data?.request?.user?.phoneNumber}
              />
              <LabelValue
                name={"Sitio"}
                value={data?.request?.user?.sitio?.name}
              />
            </Card>
            <Card className="flex flex-col items-start gap-3">
              <h3 className="font-medium uppercase text-gray-600 text-sm">
                Request Information
              </h3>
              <LabelValue
                name={"Material type"}
                value={data?.request?.materialType}
              />
              <LabelValue
                name={"Estimated weight"}
                value={`${data?.request?.estimatedWeight} ${data?.request?.weightUnit}`}
              />
              <LabelValue
                name={"Notes"}
                value={`${data?.request?.notes ? data?.request?.notes : "No notes available"}`}
              />
            </Card>
            {data?.request?.status === "COLLECTED" && (
              <Card className="flex flex-col items-start gap-3 md:col-span-2 lg:col-span-1">
                <h3 className="font-medium uppercase text-gray-600 text-sm">
                  Finalized Collection
                </h3>
                <div className="grid grid-cols-3 gap-2 w-full">
                  <LabelValue name={"Material type"} />
                  <LabelValue name={"Actual weight"} />
                  <LabelValue name={"Weight unit"} />
                </div>
                {data?.request?.collectionItems.map((item, index) => (
                  <div className="grid grid-cols-3 gap-2 w-full" key={index}>
                    <div className="">{item.materialType}</div>
                    <div className="">{item.actualWeight}</div>
                    <div className="">{item.weightUnit}</div>
                  </div>
                ))}
              </Card>
            )}
          </div>
          <Card className="flex flex-col items-start gap-3">
            <h3 className="font-medium uppercase text-gray-600 text-sm">
              Photo evidence
            </h3>
            <div className="flex  flex-col items-center justify-center border rounded-lg border-gray-300 w-full overflow-hidden md:max-h-80">
              {data?.request?.photoUrl ? (
                <img
                  src={data?.request?.photoUrl}
                  alt="Captured recyclables"
                  className="object-contain md:w-full md:h-full"
                />
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
            {data?.request?.status === "REQUESTED" && (
              <LabelValue
                name={"Submitted"}
                value={formatDate(data?.request?.createdAt)}
              />
            )}
            {(data?.request?.status === "APPROVED" ||
              data?.request?.status === "IN_PROGRESS") && (
              <div className="flex flex-col gap-2">
                <LabelValue
                  name={"Submitted"}
                  value={formatDate(data?.request?.createdAt)}
                />
                <LabelValue
                  name={"Approved"}
                  value={formatDate(data?.request?.approvedAt)}
                />
              </div>
            )}

            {data?.request?.status === "COLLECTED" && (
              <div className="flex flex-col gap-2">
                <LabelValue
                  name={"Submitted"}
                  value={formatDate(data?.request?.createdAt)}
                />
                <LabelValue
                  name={"Approved"}
                  value={formatDate(data?.request?.approvedAt)}
                />
                <LabelValue
                  name={"Collected"}
                  value={formatDate(data?.request?.collectedAt)}
                />
              </div>
            )}

            {data?.request?.status === "REJECTED" && (
              <div className="flex flex-col gap-2">
                <LabelValue
                  name={"Submitted"}
                  value={formatDate(data?.request?.createdAt)}
                />
                <LabelValue
                  name={"Rejected"}
                  value={formatDate(data?.request?.rejectedAt)}
                />
              </div>
            )}
          </Card>
          {data?.request?.status === "REQUESTED" ? (
            <Card className="flex flex-col gap-3 items-start">
              <h3 className="font-medium uppercase text-gray-600 text-sm">
                actions
              </h3>
              <PendingActions
                id={id}
                variant={"detail"}
                onSuccess={() => router.push("/collection-requests")}
              />
            </Card>
          ) : data?.request?.status === "APPROVED" ? (
            <Card className="flex flex-col gap-3 items-start">
              <h3 className="font-medium uppercase text-gray-600 text-sm">
                actions
              </h3>
              <ApprovedActions
                id={id}
                variant={"detail"}
                onSuccess={() => router.push("/collection-requests")}
              />
            </Card>
          ) : data?.request?.status === "IN_PROGRESS" ? (
            <Card className="flex flex-col gap-3 items-start">
              <h3 className="font-medium uppercase text-gray-600 text-sm">
                actions
              </h3>
              <InProgressActions
                id={id}
                variant={"detail"}
                onSuccess={() => router.push("/collection-requests")}
                materialType={data?.request?.materialType}
              />
            </Card>
          ) : (
            " "
          )}
        </div>
      </PageContent>
    </Page>
  );
}
