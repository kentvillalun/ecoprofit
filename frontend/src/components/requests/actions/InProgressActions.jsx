import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ScaleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUpdate } from "@/hooks/useUpdate";
import { toast } from "sonner";

export const InProgressActions = ({ id, onSuccess, variant, materialType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [actualWeight, setActualWeight] = useState(null);
  const [weightUnit, setWeightUnit] = useState("KG");
  const { updateStatus } = useUpdate();

  const [items, setItems] = useState([
    { materialType: "", actualWeight: "", weightUnit: "KG" },
    { materialType: "", actualWeight: "", weightUnit: "KG" },
  ]);

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addRow = () => {
    const rows = [...items];
    const newRow = { materialType: "", actualWeight: "", weightUnit: "" };
    setItems([...rows, newRow]);
  };

  const removeRow = (index) => {
    const removed = items.filter((item, i) => i !== index);
    setItems(removed);
  };

  const handleAssortedConfirm = async () => {
    toast.loading("Finalizing Record ");
    const success = await updateStatus({
      id,
      status: "COLLECTED",
      items,
    });

    if (success) {
      toast.dismiss();
      toast.success("Record finalize! Request collected!");
      setIsOpen(false);
      onSuccess();
    } else {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  const handleSimpleConfirm = async () => {
    toast.loading("Finalizing Record ");
    const success = await updateStatus({
      id,
      status: "COLLECTED",
      items: [{ materialType, actualWeight, weightUnit }],
    });

    if (success) {
      toast.dismiss();
      toast.success("Record finalize! Request collected!");
      setIsOpen(false);
      onSuccess();
    } else {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className={` ${variant === "detail" ? "grid grid-cols-1 w-full" : "flex items-center gap-3 text-sm"}`}
    >
      {isOpen &&
        createPortal(
          <Modal
            isOpen={isOpen}
            title={"Finalize Record"}
            subtitle={"Please input the actual weight of the recyclable"}
            icon={<ScaleIcon className="w-6 stroke-black" />}
            status={"IN_PROGRESS"}
            confirmLabel={"Confirm"}
            confirmClassName={
              "bg-[#74C857] hover:bg-primary transition-all duration-200 ease-in-out"
            }
            onClose={() => {
              setIsOpen(false);
              setItems([
                { materialType: "", actualWeight: "", weightUnit: "KG" },
                { materialType: "", actualWeight: "", weightUnit: "KG" },
              ]);
            }}
            onConfirm={
              materialType === "ASSORTED"
                ? handleAssortedConfirm
                : handleSimpleConfirm
            }
            
            isPill={true}
          >
            {materialType === "ASSORTED" ? (
              <div className="flex flex-col gap-2 p-6">
                {/* <div className="outline-1 py-2.5 pl-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors flex items-center justify-between"> */}
                {/* </div> */}
                {/* Labels */}
                <div className="grid w-full grid-cols-3 gap-2">
                  <label className="font-medium text-sm text-[#727272] px-2">
                    Material type
                  </label>{" "}
                  <label className="font-medium text-sm text-[#727272] px-2">
                    Actual Weight
                  </label>{" "}
                  <label className="font-medium text-sm text-[#727272] px-2">
                    Weight unit
                  </label>
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-2">
                  {items.map((item, index) => (
                    <div className="grid grid-cols-3 pr-2 gap-2" key={index}>
                      <div className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors">
                        <select
                          className="w-full outline-none"
                          onChange={(e) =>
                            updateItem(index, "materialType", e.target.value)
                          }
                        >
                          <option value="" disabled hidden>
                            Choose an option
                          </option>
                          <option value="METALS" className="">
                            Metals
                          </option>
                          <option value="PAPERS">Papers</option>
                          <option value="BOTTLES">Bottles</option>
                          <option value="PLASTICS">Plastics</option>
                        </select>
                      </div>
                      <input
                        type="number"
                        className=" focus-within:outline-[#74C857] px-2 py-2.5 rounded-lg outline-1 outline-gray-300 transition-colors"
                        placeholder="e.g. 1"
                        min={0}
                        onChange={(e) =>
                          updateItem(
                            index,
                            "actualWeight",
                            parseFloat(e.target.value),
                          )
                        }
                      />

                      <div className="flex flex-row items-center gap-2">
                        <div className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors">
                          <select
                            className="w-full outline-none"
                            onChange={(e) =>
                              updateItem(index, "weightUnit", e.target.value)
                            }
                          >
                            <option value="" disabled hidden>
                              Choose an option
                            </option>
                            <option value="" hidden disabled>
                              kg
                            </option>
                            <option value="KG">kg</option>
                            <option value="GRAMS">grams</option>
                            <option value="LBS">lbs</option>
                          </select>
                        </div>
                        <button type="button" onClick={() => removeRow(index)} disabled={items.length === 2} >
                          <XMarkIcon className="w-6 stroke-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:cursor-pointer"
                  onClick={addRow}
                  type="button"
                >
                  Add new row
                </button>
              </div>
            ) : (
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
                        const value = parseFloat(event.target.value);
                        setActualWeight(value);
                      }}
                    />
                    <select
                      className="outline-none"
                      onChange={(event) => setWeightUnit(event.target.value)}
                      value={weightUnit}
                    >
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
            )}
          </Modal>,
          document.body,
        )}

      <button
        className={` ${variant === "detail" ? "py-2.5 text-white rounded-lg hover:cursor-pointer hover:bg-primary bg-[#74C857] transition-all duration-200 ease-in-out" : "text-green-600 hover:underline"}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Complete
      </button>
    </div>
  );
};
