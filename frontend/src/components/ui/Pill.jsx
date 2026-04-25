import { Inter } from "next/font/google";
import { statusStyles, StatusLabels, statusLabels } from "@/lib/statusStyles";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// pending || approved || in_progress || collected || rejected 
export const Pill = ({ type }) => {

  return (
    <div
      className={`py-1 px-4 text-xs rounded-3xl font-medium w-30 text-center ${inter.className} capitalize ${
        statusStyles[type] || "bg-gray-200 text-gray-700"
      }`}
    >
      {statusLabels[type] || type}
    </div>
  );
};
