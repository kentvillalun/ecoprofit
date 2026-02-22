import { Card } from "@/components/ui/Card";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const BarangayHeaderCard = ({ title, subtitle }) => {
  return (
    <Card className={`${inter.className} md:py-5! md:px-6!`}>
      <div className="flex-col flex">
        <h1 className="font-semibold text-3xl hidden md:block">{title}</h1>
        <p className="">{subtitle}</p>
      </div>
    </Card>
  );
};
