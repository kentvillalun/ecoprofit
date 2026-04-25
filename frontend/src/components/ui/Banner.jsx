
import { statusBannerMessage, statusStyles } from "@/lib/statusStyles";

export const Banner = ({status}) => {
  return (
    <div className={`p-4 ${statusStyles[status]} text-center`}>
        {statusBannerMessage[status]}
    </div>
  )
};
