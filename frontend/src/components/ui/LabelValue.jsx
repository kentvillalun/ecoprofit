import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const LabelValue = ({ name, value, className = '' }) => {
  return <div className={`${inter.className} flex flex-col ${className}`}>
    <p className="text-gray-600 text-sm">{name}</p>
    <p className={`text-md ${name === "Notes" && "italic text-gray-600"}`}>{value}</p>
  </div>;
};
