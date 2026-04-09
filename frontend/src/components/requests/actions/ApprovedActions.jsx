import { useUpdate } from "@/hooks/useUpdate";
import { toast } from "sonner";

export const ApprovedActions = ({ id, onSuccess, variant }) => {
  const { updateStatus } = useUpdate();
  return (
    <div
      className={` ${variant === "detail" ? "grid grid-cols-1 w-full" : "flex items-center gap-3 text-sm"}`}
    >
      <button
        className={` ${variant === "detail" ? "bg-blue-500 py-2.5 rounded-lg text-white hover:cursor-pointer hover:bg-blue-600 transition-all duration-200 ease-in-out" : "text-blue-600 hover:underline"}`}
        onClick={async () => {
          toast.loading("Scheduling request...");
          const success = await updateStatus({ id, status: "IN_PROGRESS" });

          if (success) {
            toast.dismiss();
            toast.success("Request scheduled for collection");
            onSuccess();
          } else {
            toast.dismiss();
            toast.error("Something went wrong");
          }
        }}
      >
        Schedule
      </button>
    </div>
  );
};
