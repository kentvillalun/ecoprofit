import { useUpdate } from "@/hooks/useUpdate.js";

export const PendingActions = ({ id, handleRefetchCount }) => {
  const { data, isLoading, error, isError, updateStatus } = useUpdate();

  return (
    <div className="flex items-center gap-3 text-sm">
      <button className="text-gray-600 hover:underline">View</button>
      <button
        className="text-green-600 hover:underline"
        onClick={async () => {
          await updateStatus({ id, status: "APPROVED" });
          handleRefetchCount();
        }}
      >
        Approve
      </button>
      <button
        className="text-red-500 hover:underline"
        onClick={async () => {
          await updateStatus({ id, status: "REJECTED" });
          handleRefetchCount();
        }}
      >
        Decline
      </button>
    </div>
  );
};
