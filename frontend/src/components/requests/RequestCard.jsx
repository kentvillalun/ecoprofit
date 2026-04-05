import { Card } from "../ui/Card";
import Link from "next/link";
import { Pill } from "../ui/Pill";

// Juan Dela Cruz         [Pending]
// Sitio 3 • Plastic Bottles
// Est. Qty: 2 sacks
// March 14, 2026

// [ View Details ]
export const RequestCard = ({
  data,
  status,
  selectedIds = [],
  onToggleSelect,
}) => {
  const filteredRequest = data?.filter((req) => req.status === status);

  return (
    <>
      {filteredRequest?.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-full p-20 gap-1 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#74C857]">
            EcoProfit
          </p>
          <h1 className="text-3xl font-semibold text-[#1F2937]">
            No items yet
          </h1>
          <p className="text-sm text-[#6B7280]">
            There are no item in this tab yet. Please go to the Pending tab to update status of pickup requests
          </p>
        </div>
      ) : (
        filteredRequest?.map((d) => {
          const isApproved = status === "APPROVED";
          const isSelected = selectedIds.includes(d.id);

          return (
            <label
              key={d.id}
              className={`block ${isApproved ? "cursor-pointer" : ""}`}
            >
              {isApproved && (
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleSelect?.(d.id)}
                  className="sr-only"
                />
              )}
              <Card
                className={`flex flex-row items-stretch justify-between transition-colors ${
                  isSelected ? "bg-[#E8F7E3]!" : ""
                }`}
              >
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium">
                    {d.user.firstName
                      ? `${d.user.firstName} ${d.user.lastName}`
                      : d?.user.phoneNumber}
                  </h3>
                  <div className="text-[#727272] text-sm">
                    <p>{`${d.user.sitio.name} • ${d.materialType}`}</p>
                    <p>Est. Qty: {d.estimatedWeight} {d.weightUnit}</p>
                    <p>{d.createdAt}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between min-h-full">
                  <Pill type={d.status} />
                  <Link href={""} className="text-sm italic ">
                    View Details
                  </Link>
                </div>
              </Card>
            </label>
          );
        })
      )}
    </>
  );
};
