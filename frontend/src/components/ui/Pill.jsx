import { Berkshire_Swash, Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// pending || approved || collected || rejected 
export const Pill = ({ type }) => {
  const styles = {
    requested: "bg-[#FCD50A25] text-[#EEB90E]",
    approved: "bg-[#1D9BF017] text-[#1D9BF0]",
    rejected: "bg-[#FFE4E4] text-[#E54848]",
    collected: "bg-[#89D95720] text-[#74C857]",
    "not-scheduled": "bg-gray-200 text-gray-700",
    scheduled: "bg-blue-100 text-blue-700",
  };

  const labels = {
    requested: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    collected: "Collected",
    "not-scheduled": "Not Scheduled",
    scheduled: "Scheduled",
  };

  return (
    <div
      className={`py-1.5 px-4 text-xs rounded-3xl font-medium w-30 text-center capitalize ${
        styles[type] || "bg-gray-200 text-gray-700"
      }`}
    >
      {labels[type] || type}
    </div>
  );
};
