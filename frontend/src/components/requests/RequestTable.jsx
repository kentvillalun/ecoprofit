import { Inter } from "next/font/google";
import { Pill } from "../ui/Pill";
import { PendingActions } from "./actions/PendingActions";
import { ApprovedActions } from "./actions/ApprovedActions";
import { CollectedActions } from "./actions/CollectedActions";
import { Card } from "../ui/Card";
import { RejectedActions } from "./actions/RejectedActions";
import { InProgressActions } from "./actions/InProgressActions";
import { formatDate } from "@/lib/formatDate";
import { useRouter } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const RequestTable = ({
  data,
  status,
  selectedIds = [],
  onToggleSelect,
  handleBatchCollection,
  handleRefetchCount,
}) => {

  const router = useRouter()


  const tableConfig = {
    REQUESTED: [
      { header: "Date Requested", render: (data) => formatDate(data.createdAt) },
      {
        header: "Household",
        render: (data) =>
          data.user.firstName
            ? `${data.user.firstName} ${data.user.lastName}`
            : data.user.phoneNumber,
      },
      { header: "Sitio", render: (data) => data.user.sitio.name },
      {
        header: "Material Type",
        render: (data) => data.materialType,
      },
      {
        header: "Est. Weight",
        render: (data) => `${data.estimatedWeight} ${data.weightUnit}`,
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
          <div className="flex items-center justify-center flex-row gap-3">
            <button
              className="text-gray-600 hover:underline"
              onClick={() => {
                router.push(`/collection-requests/${data.id}`);
              }}
            >
              View
            </button>
            <PendingActions
              id={data.id}
              onSuccess={() => handleRefetchCount()}
            />
          </div>
        ),
      },
    ],
    APPROVED: [
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
      { header: "Approved Date", render: (data) => formatDate(data.approvedAt) },
      {
        header: "Household",
        render: (data) =>
          data.user.firstName
            ? `${data.user.firstName} ${data.user.lastName}`
            : data.user.phoneNumber,
      },
      { header: "Sitio", render: (data) => data.user.sitio.name },
      { header: "Material Type", render: (data) => data.materialType },
      {
        header: "Est. Weight",
        render: (data) => `${data.estimatedWeight} ${data.weightUnit}`,
      },
      {
        header: "Pickup Schedule",
        render: (data) => (
          <div className="flex items-center justify-center">
            <Pill type={data.isScheduled ? "SCHEDULED" : "NOT_SCHEDULED"} />
          </div>
        ),
      },
      {
        header: "Action",
        render: (data) => (
          <div className="flex items-center justify-center flex-row gap-3">
             <button className="text-gray-600 hover:underline" onClick={() => router.push(`/collection-requests/${data.id}`)}>View</button>
            <ApprovedActions
              id={data.id}
              onSuccess={() => handleRefetchCount()}
            />
          </div>
        ),
      },
    ],
    IN_PROGRESS: [
      { header: "Approved Date", render: (data) => formatDate(data.approvedAt) },
      {
        header: "Household",
        render: (data) =>
          data.user.firstName
            ? `${data.user.firstName} ${data.user.lastName}`
            : data.user.phoneNumber,
      },
      { header: "Sitio", render: (data) => data.user.sitio.name },
      { header: "Material Type", render: (data) => data.materialType },
      {
        header: "Est. Weight",
        render: (data) => `${data.estimatedWeight} ${data.weightUnit}`,
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
        header: "Pickup Schedule",
        render: (data) => (
          <div className="flex items-center justify-center">
            <Pill type={data.isScheduled ? "SCHEDULED" : "NOT_SCHEDULED"} />
          </div>
        ),
      },
      {
        header: "Action",
        render: (data) => (
          <div className="flex items-center justify-center flex-row gap-3">
            <button className="text-gray-600 hover:underline" onClick={() => router.push(`/collection-requests/${data.id}`)}>View</button>
            <InProgressActions
              id={data.id}
              onSuccess={() => handleRefetchCount()}
            />
          </div>
        ),
      },
    ],
    COLLECTED: [
      { header: "Collection Date", render: (data) => formatDate(data.collectedAt) },
      {
        header: "Household",
        render: (data) =>
          data.user.firstName
            ? `${data.user.firstName} ${data.user.lastName}`
            : data.user.phoneNumber,
      },
      { header: "Sitio", render: (data) => data.user.sitio.name },
      { header: "Material Type", render: (data) => data.materialType },
      {
        header: "Actual Weight",
        render: (data) => `${data.estimatedWeight} ${data.weightUnit}`,
      },
      {
        header: "Action",
        render: (data) => (
          <div className="flex items-center justify-center">
            <button className="text-gray-600 hover:underline" onClick={() => router.push(`/collection-requests/${data.id}`)}>View Details</button>
          </div>
        ),
      },
    ],
    REJECTED: [
      { header: "Date Requested", render: (data) => formatDate(data.createdAt) },
      { header: "Sitio", render: (data) => data.user.sitio.name },
      {
        header: "Material Type",
        render: (data) => data.materialType,
      },
      {
        header: "Est. Weight",
        render: (data) => `${data.estimatedWeight} ${data.weightUnit}`,
      },
      { header: "Rejection Reason", render: (data) => data.rejectionReason },
      {
        header: "Action",
        render: (data) => (
          <div className="flex items-center justify-center">
            <button className="text-gray-600 hover:underline" onClick={() => router.push(`/collection-requests/${data.id}`)}>View Details</button>
          </div>
        ),
      },
    ],
  };

  const columns = tableConfig[status];

  const filteredRequest = data?.filter((req) => req.status === status);

  return (
    <Card
      className={`${inter.className} hidden md:flex md:flex-col px-8  overflow-x-auto md:gap-3 md:items-start`}
    >
      <table className="w-full text-sm border-collapse text-nowrap">
        <thead className="border-b border-[#E6EFF5]">
          <tr className="">
            {columns?.map((col) => (
              <th className="font-medium text-base p-4" key={col.header}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="">
          {filteredRequest?.length === 0 ? (
            <tr className="max-w-md">
              <td className="text-center" colSpan={9}>
                <div className="flex flex-col items-center justify-center min-h-full p-20 gap-1">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#74C857]">
                    EcoProfit
                  </p>
                  <h1 className="text-3xl font-semibold text-[#1F2937]">
                    No items yet
                  </h1>
                  <p className="text-sm text-[#6B7280]">
                    There are no items in this tab yet. Please go to the Pending
                    tab to update status of pickup requests
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            filteredRequest?.map((req) => (
              <tr
                className="text-center hover:bg-[#f8f8f8] transition-all transform"
                key={req.id}
              >
                {columns?.map((col) => (
                  <td key={col.header} className="p-3">
                    {col.render(req)}
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
