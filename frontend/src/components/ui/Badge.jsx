
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const Badge = ({label, color}) => {

    return (
        <div
      className={`py-1 px-4 text-xs rounded-3xl font-medium text-center  ${poppins.className} ${color}`}
    >
      {label}
    </div>
    )
}