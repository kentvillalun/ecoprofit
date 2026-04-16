"use client";

import { Modal } from "@/components/ui/Modal";
import { GiftIcon } from "@heroicons/react/24/outline";

export const AddProgramModal = ({
  isProgramModalOpen,
  setIsProgramModalOpen,
}) => {
  return (
    <Modal
      isOpen={isProgramModalOpen}
      onClose={() => setIsProgramModalOpen(false)}
      icon={<GiftIcon className="w-6 stroke-black" />}
      title={"Create Program"}
      subtitle={"Please input basic details about the program"}
      confirmLabel={"Create Program"}
      confirmClassName={
        "bg-[#74C857] hover:bg-primary transition-all duration-200 ease-in-out"
      }
    >
      <div className="p-6 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-semibol">Program name</label>
          <input
            type="text"
            className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors"
            placeholder="Input the program name here"
            // onChange={(event) => setRejectionReason(event.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 ">
            <label className="text-gray-700 font-semibol">
              Allotted budget
            </label>
            <input
              type="number"
              className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors"
              placeholder="Input budget here"
              //   onChange={(event) => setRejectionReason(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="text-gray-700 font-semibol">Maximum points</label>
            <input
              type="number"
              className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors"
              placeholder="Input max points here"
              //   onChange={(event) => setRejectionReason(event.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-semibol">Material Section</label>

          <div className="flex flex-col gap-3">
            <div className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors flex flex-row gap-2 w-full">
              <label className="pr-6 text-gray-400" htmlFor="plastics">
                Plastics
              </label>
              <input
                type="number"
                className="w-full outline-none"
                id="plastics"
                placeholder="Input point value for plastics"
              />
            </div>

            <div className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors flex flex-row gap-3 w-full">
              <label className="pr-6 text-gray-400" htmlFor="metals">
                Metals
              </label>
              <input
                type="number"
                className="w-full outline-none"
                id="metals"
                placeholder="Input point value for metals"
              />
            </div>

            <div className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors flex flex-row gap-3 w-full">
              <label className="pr-6 text-gray-400" htmlFor="bottles">
                Bottles
              </label>
              <input
                type="number"
                className="w-full outline-none"
                id="bottles"
                placeholder="Input point value for bottles"
              />
            </div>

            <div className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors flex flex-row gap-3 w-full">
              <label className="pr-6 text-gray-400" htmlFor="papers">
                Papers
              </label>
              <input
                type="number"
                className="w-full outline-none"
                id="papers"
                placeholder="Input point value for papers"
              />
            </div>
            <p className="text-gray-700 text-sm"><span className="font-medium">Note: </span>Please leave the field blank if you don't want to asign any points to the material</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
