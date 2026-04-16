"use client";

import { Modal } from "@/components/ui/Modal";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

export const AddTransactionModal = ({
  isTransactionModalOpen,
  setIsTransactionModalOpen,
  setTransactionRefetchCount,
}) => {
  return (
    <Modal
      title={"Record Transaction"}
      isOpen={isTransactionModalOpen}
      onClose={() => setIsTransactionModalOpen(false)}
      icon={<Bars3BottomLeftIcon className="stroke-black w-6"/>}
      subtitle={"Choose program and record transaction"}
      confirmLabel={"Record Transaction"}
      confirmClassName={'bg-[#74C857] hover:bg-primary transition-all duration-200 ease-in-out'}
    ></Modal>
  );
};
