"use client";

import { Modal } from "@/components/ui/Modal";
import { GiftIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@/hooks/useMutation";
import { toast } from "sonner";

const schema = yup.object().shape({
  name: yup.string().required("Program name is required"),
  allotedBudget: yup
    .number("Please input a number only")
    .required("Budget is required"),
  maxPoints: yup
    .number("Please input a number only")
    .required("Maximum points is required"),
  materials: yup
    .object()
    .test(
      "at-least-one",
      "Please assign at least one material point value",
      (value) =>
        Object.values(value).some(
          (v) => v !== "" && v !== null && v !== undefined,
        ),
    ),
});

export const AddProgramModal = ({
  isProgramModalOpen,
  setIsProgramModalOpen,
  setRefetchCount
}) => {
  const { makeRequest, isLoading, data, error, isError } = useMutation();
  const url = "/api/redemption/programs";

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      allotedBudget: null,
      maxPoints: null,
      materials: "",
    },
  });

  const onSubmit = async (formData) => {
    const programMaterial = Object.entries(formData.materials)
      .filter((f) => {
        return f[1] !== "";
      })
      .map(([key, value]) => ({ materialType: key, pointValue: parseFloat(value) }));

    toast.loading("Creating program");
    const success = await makeRequest({
      url,
      body: {
        name: formData.name,
        allotedBudget: formData.allotedBudget,
        maxPoints: formData.maxPoints,
        programMaterial,
      },
    });

    if (success) {
      toast.dismiss();
      toast.success("Program created");
      setIsProgramModalOpen(false);
      setRefetchCount((prev) => prev + 1)
      reset()
    } else {
      toast.dismiss();
      toast.error("Creating program failed");
    }
  };

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
      onConfirm={() => handleSubmit(onSubmit)()}
    >
      <div className="p-6 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">Program name</label>
          <input
            type="text"
            className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors"
            placeholder="Input the program name here"
            {...register("name")}
            // onChange={(event) => setRejectionReason(event.target.value)}
          />
          {errors.name && (
            <p className="text-[14px] text-red-500 text-start">
              {errors.name?.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 ">
            <label className="text-gray-700 font-medium">
              Allotted budget
            </label>
            <input
              type="number"
              className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors"
              placeholder="Input budget here"
              {...register("allotedBudget")}
              //   onChange={(event) => setRejectionReason(event.target.value)}
            />
            {errors.allotedBudget && (
              <p className="text-[14px] text-red-500 text-start">
                {errors.allotedBudget?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="text-gray-700 font-medium">Maximum points</label>
            <input
              type="number"
              className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors"
              placeholder="Input max points here"
              {...register("maxPoints")}

              //   onChange={(event) => setRejectionReason(event.target.value)}
            />
            {errors.maxPoints && (
              <p className="text-[14px] text-red-500 text-start">
                {errors.maxPoints?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">Material Section</label>

          <div className="flex flex-col gap-3 items-start">
            <div className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors flex flex-row gap-2 w-full">
              <label className="pr-6 text-gray-400" htmlFor="plastics">
                Plastics
              </label>
              <input
                type="number"
                min={0}
                className="w-full outline-none"
                id="plastics"
                placeholder="Input point value"
                {...register("materials.PLASTICS")}
              />
            </div>

            <div className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors flex flex-row gap-3 w-full">
              <label className="pr-6 text-gray-400" htmlFor="metals">
                Metals
              </label>
              <input
                type="number"
                min={0}
                className="w-full outline-none"
                id="metals"
                placeholder="Input point value"
                {...register("materials.METALS")}
              />
            </div>

            <div className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors flex flex-row gap-3 w-full">
              <label className="pr-6 text-gray-400" htmlFor="bottles">
                Bottles
              </label>
              <input
                type="number"
                min={0}
                className="w-full outline-none"
                id="bottles"
                placeholder="Input point value"
                {...register("materials.BOTTLES")}
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
                min={0}
                placeholder="Input point value"
                {...register("materials.PAPERS")}
              />
            </div>
            {errors.materials && (
              <p className="text-[14px] text-red-500 text-center md:text-start">
                {errors.materials?.message}
              </p>
            )}
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Note: </span>Please leave the field
              blank if you don't want to assign any points to the material
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
