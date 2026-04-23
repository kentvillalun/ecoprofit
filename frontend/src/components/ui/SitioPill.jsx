import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const SitioPill = ({ type, className = "" }) => {




  const styles = {
    SITIO1: "bg-[#eaf7e3] text-[#4a9e2f]",
    SITIO2: "bg-transparent text-[#4a9e2f] border",
    SITIO3: "bg-[#74C857] text-[#ffffff]",
  };

  const labels = {
    SITIO1 : "Sitio 1",
    SITIO2: "Sitio 2",
    SITIO3: "Sitio 3",
  };

  return (
    <div
      className={`py-1 px-4 ${className} text-xs rounded-3xl font-medium w-30 text-center ${inter.className} ${
        styles[type] || "bg-gray-200 text-gray-700"
      }`}
    >
      {labels[type] || type}
    </div>
  );
};
