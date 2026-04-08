import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ScaleIcon } from "@heroicons/react/24/outline";
import { useUpdate } from "@/hooks/useUpdate";
import { toast } from "sonner";

export const InProgressActions = ({ id, handleRefetchCount = () => {}, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [actualWeight, setActualWeight] = useState(null);
  const [weightUnit, setWeightUnit] = useState("KG")

  const { updateStatus } = useUpdate()

  return (
    <div className="flex items-center gap-3 text-sm">
      {isOpen &&
        createPortal(
          <Modal
            isOpen={isOpen}
            title={"Finalizing Record"}
            subtitle={"Please input the actual weight of the recyclable"}
            icon={<ScaleIcon className="w-6 stroke-black" />}
            status={"IN_PROGRESS"}
            confirmLabel={"Confirm"}
            confirmClassName={"bg-[#74C857]"}
            onClose={() => setIsOpen(false)}
            onConfirm={async () => {
              const success = await updateStatus({id, status: "COLLECTED", actualWeight, weightUnit})

              if (success) {
                toast.success("Request collected!")
                handleRefetchCount();
                setIsOpen(false);
                onSuccess?.();
              } else {
                toast.error("Something went wrong")
              }
            }}
          >
            <div className="flex flex-col gap-1 p-6">
              <label className="font-medium text-sm text-[#727272] px-2">
                Actual Weight
              </label>
              <div className="outline-1 py-2.5 pl-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors flex items-center justify-between">
                <div className="flex flex-row justify-center items-center w-full pr-4">
                  <input
                    type="number"
                    className="outline-none w-full"
                    placeholder="e.g. 1"
                    min={0}
                    onChange={(event) => {
                      const value = parseFloat(event.target.value)
                      setActualWeight(value)
                    }}
                  />
                  <select className="outline-none" onChange={(event) => setWeightUnit(event.target.value)} value={weightUnit}>
                    <option value="" hidden disabled>
                      kg
                    </option>
                    <option value="KG">kg</option>
                    <option value="GRAMS">grams</option>
                    <option value="LBS">lbs</option>
                  </select>
                </div>
              </div>
            </div>
          </Modal>,
          document.body,
        )}
      <button className="text-gray-600 hover:underline">View</button>
      <button
        className="text-green-600 hover:underline"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Complete
      </button>
    </div>
  );
};
