"use client";

import { useUpdate } from "@/hooks/useUpdate.js";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "@/components/ui/Modal";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

export const PendingActions = ({ id, handleRefetchCount = () => {}, onSuccess }) => {
  const { data, isLoading, error, isError, updateStatus } = useUpdate();
  const [isOpen, setIsOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  return (
    <div className="flex items-center gap-3 text-sm">
      {isOpen &&
        createPortal(
          <Modal
            title={"Decline Request"}
            isOpen={isOpen}
            subtitle={"Please state the rejection reason"}
            status={"REQUESTED"}
            icon={<ExclamationTriangleIcon className="w-6 stroke-black" />}
            confirmLabel={"Decline"}
            confirmClassName={"bg-red-500"}
            onClose={() => setIsOpen(false)}
            onConfirm={async () => {
              const success = await updateStatus({ id, status: "REJECTED", rejectionReason });

              if (success) {
                toast.success("Request declined")
                handleRefetchCount();
                setIsOpen(false)
                onSuccess?.();
              } else {
                toast.error("Someting went wrong")

              }
            }}
          >
            <div className="flex flex-col gap-1 p-6">
              <label className="text-gray-700 font-semibol">
                Rejection Reason
              </label>
              <textarea
                type="text"
                className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors"
                rows={4}
                placeholder="Input the reason here"
                onChange={(event) => setRejectionReason(event.target.value)}
              />
            </div>
          </Modal>,
          document.body,
        )}
      <button className="text-gray-600 hover:underline">View</button>
      <button
        className="text-green-600 hover:underline"
        onClick={async () => {
          const success = await updateStatus({ id, status: "APPROVED" });
          handleRefetchCount();
          setIsOpen(false);
          toast.success("Request approved");
          if (success) onSuccess?.();
        }}
      >
        Approve
      </button>
      <button
        className="text-red-500 hover:underline"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Decline
      </button>
    </div>
  );
};
