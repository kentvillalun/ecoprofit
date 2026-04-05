import { Berkshire_Swash, Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// pending || approved || in_progress || collected || rejected 
export const Pill = ({ type }) => {




  const styles = {
    REQUESTED: "bg-[#FCD50A25] text-[#EEB90E]",
    APPROVED: "bg-[#1D9BF017] text-[#1D9BF0]",
    IN_PROGRESS: "bg-[#FFF4D6] text-[#C88A00]",
    REJECTED: "bg-[#FFE4E4] text-[#E54848]",
    COLLECTED: "bg-[#89D95720] text-[#74C857]",
    NOT_SCHEDULED: "bg-gray-200 text-gray-700",
    SCHEDULED: "bg-blue-100 text-blue-700",
  };

  const labels = {
    REQUESTED : "Pending",
    APPROVED: "Approved",
    IN_PROGRESS: "In Progress",
    REJECTED: "Rejected",
    COLLECTED: "Collected",
    NOT_SCHEDULED: "Not Scheduled",
    SCHEDULED: "Scheduled",
  };

  return (
    <div
      className={`py-1 px-4 text-xs rounded-3xl font-medium w-30 text-center ${poppins.className} capitalize ${
        styles[type] || "bg-gray-200 text-gray-700"
      }`}
    >
      {labels[type] || type}
    </div>
  );
};
