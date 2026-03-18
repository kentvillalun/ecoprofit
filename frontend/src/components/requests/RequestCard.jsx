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
  const filteredRequest = data.filter((req) => req.status === status);

  return (
    <>
      {filteredRequest.map((d) => {
        const isApproved = status === "approved";
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
                <h3 className="font-medium">{d.residentName}</h3>
                <div className="text-[#727272] text-sm">
                  <p>{`${d.sitio} • ${d.materialType}`}</p>
                  <p>Est. Qty: {d.estimatedWeight}</p>
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
      })}
    </>
  );
};
