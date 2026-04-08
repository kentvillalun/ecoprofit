import { useUpdate } from "@/hooks/useUpdate";
import { toast } from "sonner";


export const ApprovedActions = ({ id, handleRefetchCount = () => {}, onSuccess }) => {

  const { updateStatus } = useUpdate();
  return (
    <div className="flex items-center gap-3 text-sm">
      <button className="text-gray-600 hover:underline">View</button>
      <button className="text-blue-600 hover:underline" onClick={async () => {
        const success = await updateStatus({ id, status: "IN_PROGRESS" });
        handleRefetchCount();
        toast.success("Request scheduled for collection");
        if (success) onSuccess?.();
      }}>Schedule</button>
    </div>
  );
};