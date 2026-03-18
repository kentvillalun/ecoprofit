import { Inter } from "next/font/google";
import { Pill } from "../ui/Pill";
import { PendingActions } from "./actions/PendingActions";
import { ApprovedActions } from "./actions/ApprovedActions";
import { CollectedActions } from "./actions/CollectedActions";
import { Card } from "../ui/Card";
import { RejectedActions } from "./actions/RejectedActions";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const RequestTable = ({
  data,
  status,
  selectedIds = [],
  onToggleSelect,
  handleBatchCollection
}) => {
  const tableConfig = {
    requested: [
      { header: "Date Requested", render: (data) => data.createdAt },
      {
        header: "Household",
        render: (data) => data.residentName,
      },
      { header: "Sitio", render: (data) => data.sitio },
      {
        header: "Material Type",
        render: (data) => data.materialType,
      },
      {
        header: "Est. Weight",
        render: (data) => data.estimatedWeight,
      },
      {
        header: "Status",
        render: (data) => (
          <div className="flex items-center justify-center">
            <Pill type={data.status} />
          </div>
        ),
      },
      {
        header: "Action",
        render: (data) => (
          <div className="flex items-center justify-center">
            <PendingActions />
          </div>
        ),
      },
    ],
    approved: [
      {
        header: "Select",
        render: (data) => (
          <input
            type="checkbox"
            checked={selectedIds.includes(data.id)}
            onChange={() => onToggleSelect?.(data.id)}
          />
        ),
      },
      { header: "Approved Date", render: (data) => data.approvedAt },
      { header: "Household", render: (data) => data.residentName },
      { header: "Sitio", render: (data) => data.sitio },
      { header: "Material Type", render: (data) => data.materialType },
      { header: "Est. Weight", render: (data) => data.estimatedWeight },
      {
        header: "Pickup Schedule",
        render: (data) => (
          <div className="flex items-center justify-center">
            <Pill type={data.scheduleStatus} />
          </div>
        ),
      },
      {
        header: "Action",
        render: (data) => (
          <div className="flex items-center justify-center">
            <ApprovedActions />
          </div>
        ),
      },
    ],
    in_progress: [
      { header: "Approved Date", render: (data) => data.approvedAt },
      { header: "Household", render: (data) => data.residentName },
      { header: "Sitio", render: (data) => data.sitio },
      { header: "Material Type", render: (data) => data.materialType },
      { header: "Est. Weight", render: (data) => data.estimatedWeight },
      {
        header: "Status",
        render: (data) => (
          <div className="flex items-center justify-center">
            <Pill type={data.status} />
          </div>
        ),
      },
      {
        header: "Pickup Schedule",
        render: (data) => (
          <div className="flex items-center justify-center">
            <Pill type={data.scheduleStatus} />
          </div>
        ),
      },
      {
        header: "Action",
        render: () => (
          <div className="flex items-center justify-center">
            <ApprovedActions />
          </div>
        ),
      },
    ],
    collected: [
      { header: "Collection Data", render: (data) => data.collectionDate },
      { header: "Household", render: (data) => data.residentName },
      { header: "Sitio", render: (data) => data.sitio },
      { header: "Material Type", render: (data) => data.materialType },
      { header: "Actual Weight", render: (data) => data.actualWeight },
      { header: "Reward Equivalent", render: (data) => data.rewardEquivalent },
      {
        header: "Action",
        render: (data) => (
          <div className="flex items-center justify-center">
            <CollectedActions />
          </div>
        ),
      },
    ],
    rejected: [
      { header: "Date Requested", render: (data) => data.createdAt },
      { header: "Sitio", render: (data) => data.sitio },
      {
        header: "Material Type",
        render: (data) => data.materialType,
      },
      {
        header: "Est. Weight",
        render: (data) => data.estimatedWeight,
      },
      { header: "Rejection Reason", render: (data) => data.rejectionReason },
      {
        header: "Action",
        render: (data) => (
          <div className="flex items-center justify-center">
            <RejectedActions />
          </div>
        ),
      },
    ],
  };

  const columns = tableConfig[status];

  const filteredRequest = data.filter((req) => req.status === status);

  return (
    <Card
      className={`${inter.className} hidden md:flex md:flex-col px-8  overflow-x-auto md:gap-3 md:items-start`}
    >
      <table className="w-full text-sm border-collapse text-nowrap">
        <thead className="border-b border-[#E6EFF5]">
          <tr className="">
            {columns.map((col) => (
              <th className="font-medium text-base p-4" key={col.header}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {filteredRequest.map((req) => (
            <tr
              className="text-center hover:bg-[#f8f8f8] transition-all transform "
              key={req.id}
            >
              {columns.map((col) => (
                <td key={col.header} className="p-3">
                  {col.render(req)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
     
    </Card>
  );
};
