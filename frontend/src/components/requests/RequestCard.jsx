import { Card } from "../ui/Card";
import { useRouter } from "next/navigation";
import { Pill } from "../ui/Pill";
import { formatDate } from "@/lib/formatDate";
import { SkeletonCard } from "../ui/SkeletonCard";
import { Error } from "../ui/Error";
import { Empty } from "../ui/Empty";

export const RequestCard = ({
  data,
  status,
  selectedIds = [],
  onToggleSelect,
  isLoading,
  isError,
  handleRefetchCount
}) => {
  const filteredRequest = data?.filter((req) => req.status === status);
  const router = useRouter();


  if (isLoading)
    return (
      <SkeletonCard rowsCount={4}/>
    );

  if (isError) return (
    <Error handleRefetchCount={handleRefetchCount}/>
  )

  return (
    <>
      {filteredRequest?.length === 0 ? (
        <Empty text={"No items"} subtext={"There are no item in this tab yet. Please go to the Pending tab to update status of pickup requests"}/>
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
                    <p>
                      Est. Qty: {d.estimatedWeight} {d.weightUnit}
                    </p>
                    <p>{formatDate(d.createdAt)}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between min-h-full">
                  <Pill type={d.status} />
                  <button
                    className="text-sm font-medium text-primary hover:underline"
                    onClick={() => router.push(`/collection-requests/${d.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </Card>
            </label>
          );
        })
      )}
    </>
  );
};
