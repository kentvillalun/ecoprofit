"use client";

import { formatDate } from "@/lib/formatDate";
import { Card } from "../ui/Card";
import { MaterialPill } from "../ui/MateriaPill";
import { SkeletonCard } from "../ui/SkeletonCard";
import { Error } from "../ui/Error";

export const TransactionCard = ({
  data,
  isLoading,
  isError,
  handleRefetchCount,
}) => {
  return (
    <>
      {isLoading && <SkeletonCard rowsCount={3}/>}

      {isError && (
        <div className="md:hidden">
          <Error handleRefetchCount={handleRefetchCount} />
        </div>
      )}
      {data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-full p-20 gap-1 md:hidden">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#74C857]">
            EcoProfit
          </p>
          <h1 className="text-3xl font-semibold text-[#1F2937]">
            No transactions yet
          </h1>
          <p className="text-sm text-[#6B7280]">
            There are no redemption trasaction yet.
          </p>
        </div>
      ) : (
        data?.transactions?.map((d) => (
          <Card
            className="flex flex-col md:hidden items-start gap-3"
            key={d?.id}
          >
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col">
                <h3 className="font-semibold">{d?.beneficiaryName}</h3>
                <p className="text-sm text-gray-500">
                  {d?.programMaterial?.program?.name}
                </p>
                <p className="text-sm text-gray-400">By: {d?.collectorName}</p>
                <p className="text-sm text-gray-400 capitalize">{(d?.educationalLevel).toLowerCase()} level</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <MaterialPill
                  type={`${d?.programMaterial?.materialType}`}
                  points={`${d?.quantity * d?.currentPointValue}`}
                />
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                {formatDate(d?.createdAt)}
              </p>
              <p className="text-xs text-gray-500 font-medium">
                Qty: {d?.quantity}
              </p>
            </div>
          </Card>
        ))
      )}
    </>
  );
};
