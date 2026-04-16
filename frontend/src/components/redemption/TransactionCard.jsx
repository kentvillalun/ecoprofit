"use client";

import { formatDate } from "@/lib/formatDate";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Pill } from "../ui/Pill";
import { MaterialPill } from "../ui/MateriaPill";

export const TransactionCard = ({ data }) => {
  return (
    <>
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-full p-20 gap-1">
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
        data?.map((d) => (
          <Card className="flex flex-col md:hidden items-start" key={d?.id}>
            <div className="flex flex-row justify-between w-full">
              <div className="">
                <h3 className="font-medium">{d?.beneficiaryName}</h3>
                <div className="flex flex-col text-[#727272] text-sm">
                  <p className="">{d?.program.name}</p>
                  <p className="">Collected By: {d?.collectorName}</p>
                  <p className="">{formatDate(d?.createdAt)}</p>
                </div>
              </div>
              <div className="">
                <div className="flex flex-col gap-1 ">
                  <MaterialPill
                    type={`${d?.materialType}`}
                    points={`${d?.quantity * d?.currentPointValue}`}
                    
                  />
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </>
  );
};
