"use client";

import { Page } from "@/components/layout/Page";
import { BarangayTopBar } from "@/components/navigation/BarangayTopBar";
import { PageContent } from "@/components/layout/PageContent";
import { BarangayHeaderCard } from "@/components/ui/BarangayHeaderCard";
import { Card } from "@/components/ui/Card";
import { IconContainer } from "@/components/ui/IconContainer";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import {
  InboxStackIcon,
  ClipboardDocumentCheckIcon,
  UserIcon,
  ArrowTrendingUpIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";
import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Error } from "@/components/ui/Error";

export default function BarangayDashboardPage() {
  const [refetchCount, setRefetchCount] = useState(0);
  const url = `/api/dashboard/`;
  const { isLoading, isError, data } = useFetch({ url, refetchCount });

  const handleRefetchCount = () => setRefetchCount((prev) => prev + 1)

  return (
    <Page>
      <BarangayTopBar title="Dashboard" />
      <PageContent className="bg-[#F3F3FF]! md:pl-80 md:p-6 md:gap-7">
        <BarangayHeaderCard
          title={"Dashboard"}
          subtitle={"Barangay Recycling Overview"}
        />

        {isLoading ? (
          <section className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Card className="flex-col items-start gap-3">
              <IconContainer
                icon={<ArrowPathIcon className="w-6" stroke="#74C857" />}
                containerColor={"#F0FAF0"}
              />
              <div className="flex flex-col gap-1">
                <p className="capitalize font-semibold text-sm">
                  Total Recyclables Collected
                </p>
                <Skeleton width={130} height={30} />
                <p className="text-sm">
                  Total material collected across all sources
                </p>
              </div>
            </Card>

            <Card className="flex-col items-start gap-3">
              <IconContainer
                icon={<InboxStackIcon className="w-6" fill="#F6A623" />}
                containerColor={"#FFF8EC"}
              />
              <div className="flex flex-col gap-1">
                <p className="capitalize font-semibold text-sm">
                  Pending Collection Requests
                </p>
                <Skeleton width={130} height={30} />
                <p className="text-sm">Awaiting approval or pickup</p>
              </div>
            </Card>

            <Card className="flex-col items-start gap-3">
              <IconContainer
                icon={
                  <ClipboardDocumentCheckIcon className="w-6" fill="#4A7FF7" />
                }
                containerColor={"#EEF4FF"}
              />
              <div className="flex flex-col gap-1">
                <p className="capitalize font-semibold text-sm">
                  Total Intake Transactions
                </p>
                <Skeleton width={130} height={30} />
                <p className="text-sm">
                  Recorded intake entries across sources
                </p>
              </div>
            </Card>

            <Card className="flex-col items-start gap-3">
              <IconContainer
                icon={<UserIcon className="w-6" fill="#E05555" />}
                containerColor={"#FFF0F0"}
              />
              <div className="flex flex-col gap-1">
                <p className="capitalize font-semibold text-sm">
                  Unverified Residents
                </p>
                <Skeleton width={130} height={30} />
                <p className="text-sm">
                  Registered accounts pending verification
                </p>
              </div>
            </Card>

            <Card className="flex-col items-start gap-3">
              <IconContainer
                icon={<ArrowTrendingUpIcon className="w-6" fill="#8B5CF6" />}
                containerColor={"#F5F0FF"}
              />
              <div className="flex flex-col gap-1">
                <p className="capitalize font-semibold text-sm">
                  Total Program Expenses
                </p>
                <Skeleton width={130} height={30} />
                <p className="text-sm">
                  Cumulative expenses across all programs
                </p>
              </div>
            </Card>

            <Card className="flex-col items-start gap-3 bg-linear-to-b from-[#FFFFFF] from-24% to-[#89D957]">
              <IconContainer
                icon={<WalletIcon className="w-6" fill="#74C857" />}
              />
              <div className="flex flex-col gap-1">
                <p className="capitalize font-semibold text-sm">
                  Current Fund Balance
                </p>
                <Skeleton width={130} height={30} />
                <p className="text-sm">Available barangay program funds</p>
              </div>
            </Card>
          </section>
        ) : isError ? (
          <Error subtext={"We coudn't get your dashboard data"} handleRefetchCount={handleRefetchCount}/>
        ) : (
          <section className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Card className="flex-col items-start gap-3">
              <IconContainer
                icon={<ArrowPathIcon className="w-6" stroke="#74C857" />}
                containerColor={"#F0FAF0"}
              />
              <div className="flex flex-col gap-1">
                <p className="capitalize font-semibold text-sm">
                  Total Recyclables Collected
                </p>
                <p className="font-bold text-3xl">1, 250 kg</p>
                <p className="text-sm">
                  Total material collected across all sources
                </p>
              </div>
            </Card>

            <Card className="flex-col items-start gap-3">
              <IconContainer
                icon={<InboxStackIcon className="w-6" fill="#F6A623" />}
                containerColor={"#FFF8EC"}
              />
              <div className="flex flex-col gap-1">
                <p className="capitalize font-semibold text-sm">
                  Pending Collection Requests
                </p>
                <p className="font-bold text-3xl">{data?.requestedCount}</p>
                <p className="text-sm">Awaiting approval or pickup</p>
              </div>
            </Card>

            <Card className="flex-col items-start gap-3">
              <IconContainer
                icon={
                  <ClipboardDocumentCheckIcon className="w-6" fill="#4A7FF7" />
                }
                containerColor={"#EEF4FF"}
              />
              <div className="flex flex-col gap-1">
                <p className="capitalize font-semibold text-sm">
                  Total Intake Transactions
                </p>
                <p className="font-bold text-3xl">{data?.totalRecords}</p>
                <p className="text-sm">
                  Recorded intake entries across sources
                </p>
              </div>
            </Card>

            <Card className="flex-col items-start gap-3">
              <IconContainer
                icon={<UserIcon className="w-6" fill="#E05555" />}
                containerColor={"#FFF0F0"}
              />
              <div className="flex flex-col gap-1">
                <p className="capitalize font-semibold text-sm">
                  Unverified Residents
                </p>
                <p className="font-bold text-3xl">{data?.unverified}</p>
                <p className="text-sm">
                  Registered accounts pending verification
                </p>
              </div>
            </Card>

            <Card className="flex-col items-start gap-3">
              <IconContainer
                icon={<ArrowTrendingUpIcon className="w-6" fill="#8B5CF6" />}
                containerColor={"#F5F0FF"}
              />
              <div className="flex flex-col gap-1">
                <p className="capitalize font-semibold text-sm">
                  Total Program Expenses
                </p>
                <p className="font-bold text-3xl">₱ 43,500</p>
                <p className="text-sm">
                  Cumulative expenses across all programs
                </p>
              </div>
            </Card>

            <Card className="flex-col items-start gap-3 bg-linear-to-b from-[#FFFFFF] from-24% to-[#89D957]">
              <IconContainer
                icon={<WalletIcon className="w-6" fill="#74C857" />}
              />
              <div className="flex flex-col gap-1">
                <p className="capitalize font-semibold text-sm">
                  Current Fund Balance
                </p>
                <p className="font-bold text-3xl">₱ 17,500</p>
                <p className="text-sm">Available barangay program funds</p>
              </div>
            </Card>
          </section>
        )}
      </PageContent>
    </Page>
  );
}
