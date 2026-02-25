import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})

// pending || approved || for pickup || completed
export const Pill = ({ type }) => {
  return (
    <div
      className={`py-1.5 px-4 text-xs rounded-3xl font-medium text-white ${type === "Approved" && "bg-[#1D9BF017] text-[#1D9BF0]!"} ${type === "For Pickup" && "bg-[#E87932]"} ${type === "Completed" && "bg-[#89D95720] text-[#74C857]!"} ${type === "Pending" && "bg-[#FCD50A25] text-[#EEB90E]!"} min-w-25`}
    >
      {type}
    </div>
  );
};
