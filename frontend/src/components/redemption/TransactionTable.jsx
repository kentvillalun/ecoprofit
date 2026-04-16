"use client";

import { formatDate } from "@/lib/formatDate";
import { Card } from "../ui/Card";
import { Inter } from "next/font/google";
import { MaterialPill } from "../ui/MateriaPill";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const TransactionTable = ({ data }) => {
  const tableConfig = [
    {
      header: "Beneficiary",
      render: (data) => (
        <div className="flex flex-col items-start justify-center">
          <p className="text-md font-semibold">{data.beneficiaryName}</p>
          <p className="capitalize">
            {data.educationalLevel} · Collected by: {data.collectorName}{" "}
          </p>
        </div>
      ),
    },
    {
      header: "Program",
      render: (data) => (
        <div className="font-semibold">{data.program.name}</div>
      ),
    },
    {
      header: "Material",
      render: (data) => (
        <div className="flex items-center w-full flex-col">
          <MaterialPill type={data.materialType} />
        </div>
      ),
    },
    {
      header: "Qty",
      render: (data) => <span className="font-semibold">{data.quantity}</span>,
    },
    {
      header: "Points",
      render: (data) => (
        <span className="text-green-600 font-bold">
          {data.quantity * data.currentPointValue} pts
        </span>
      ),
    },
    {
      header: "Date",
      render: (data) => formatDate(data.createdAt),
    },
  ];

  return (
    <Card
      className={`${inter.className} hidden md:flex md:flex-col px-8  overflow-x-auto md:gap-3 md:items-start`}
    >
      <table className="w-full text-sm border-collapse text-nowrap">
        <thead className="border-b border-[#E6EFF5]">
          <tr className="">
            {tableConfig.map((col) => (
              <th className="font-medium text-base p-4" key={col.header}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr className="max-w-md">
              <td className="text-center" colSpan={6}>
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
              </td>
            </tr>
          ) : (
            data?.map((t) => (
              <tr
                className="text-center hover:bg-[#f8f8f8] transition-all transform"
                key={t.id}
              >
                {tableConfig.map((col) => (
                  <td key={col.header} className="p-3">
                    {col.render(t)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Card>
  );
};
